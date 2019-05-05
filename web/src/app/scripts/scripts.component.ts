import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISchema } from 'src/lib/bitflow-proto';
import { AngularFireDatabase } from '@angular/fire/database';
import { SCHEMA, ADDRESS, SCRIPT } from 'src/lib/constants';

declare const moneyButton;
declare const bsv;

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent implements OnInit {
  scripts: Observable<any[]>;
  mbdiv: any;
  name: string;
  fileData: any;
  result: string;
  JSON: any;

  constructor(rtDb: AngularFireDatabase) {
    this.scripts = rtDb.list<any>('scripts').valueChanges();
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
    script.add(bsv.deps.Buffer.from(SCRIPT));
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
