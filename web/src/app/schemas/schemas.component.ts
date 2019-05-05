import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISchema } from 'src/lib/bitflow-proto';
import { AngularFireDatabase } from '@angular/fire/database';
import { SCHEMA, ADDRESS } from 'src/lib/constants';

declare const moneyButton;
declare const bsv;

@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.css']
})
export class SchemasComponent implements OnInit {
  schemas: Observable<ISchema[]>;
  mbdiv: any;
  name: string;
  fileData: any;
  result: string;
  JSON: any;

  constructor(rtDb: AngularFireDatabase) {
    this.schemas = rtDb.list<ISchema>('schemas').valueChanges();
    this.JSON = JSON;
   }

  ngOnInit() {
    this.mbdiv = document.getElementById('money-button');
    this.updateMoneybutton();
  }

  onFileChange($event) {
    const reader = new FileReader();
    reader.onload = () => {
      this.fileData = reader.result;
      this.updateMoneybutton();
    }
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  updateMoneybutton() {
    let script = new bsv.Script();
    script.add(bsv.Opcode.OP_RETURN);
    script.add(bsv.deps.Buffer.from(SCHEMA));
    script.add(bsv.deps.Buffer.from(this.fileData || ''));
    moneyButton.render(this.mbdiv, {
      label: 'Upload',
      outputs: [
        {
          type: 'SCRIPT',
          script: script.toASM(),
          amount: 0,
          currency: 'BSV'
        },
        {
          address: ADDRESS,
          amount: 546 / 100000000,
          currency: 'BSV'
        }
      ],
      disabled: !this.fileData,
      onPayment: (payment) => {
        this.result = payment.txid;
      },
      onError: (error) => {
        this.result = `Error: ${error.message}`;
      }
    })
  }
}
