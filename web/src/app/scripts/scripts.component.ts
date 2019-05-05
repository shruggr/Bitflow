import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ADDRESS, SCRIPT } from 'src/lib/constants';
import { AngularFirestore } from '@angular/fire/firestore';

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
  filename: string;
  result: string;
  JSON: any;

  constructor(db: AngularFirestore) {
    this.scripts = db.collection<any>('scripts').valueChanges();
    this.JSON = JSON;
   }

  ngOnInit() {
    this.mbdiv = document.getElementById('money-button');
    this.updateMoneybutton();
  }

  onFileChange($event) {
    const reader = new FileReader();
    const file: File = $event.target.files[0];
    reader.onload = () => {
      this.filename = file.name;
      this.fileData = reader.result;
      this.updateMoneybutton();
    }
    reader.readAsArrayBuffer(file);
  }

  updateMoneybutton() {
    let script = new bsv.Script();
    script.add(bsv.Opcode.OP_RETURN);
    script.add(bsv.deps.Buffer.from(SCRIPT));
    script.add(bsv.deps.Buffer.from(this.fileData || ''));
    script.add(bsv.deps.Buffer.from(this.filename || ''));
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
