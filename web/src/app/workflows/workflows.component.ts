import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkflow } from 'src/lib/bitflow-proto';
import { AngularFireDatabase } from '@angular/fire/database';
import { ADDRESS, WORKFLOW } from 'src/lib/constants';

declare const moneyButton;
declare const bsv;

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  workflows: Observable<IWorkflow[]>;
  mbdiv: any;
  fileData: any;
  result: string;
  workflowTxn: string;
  JSON: any;

  constructor(rtDb: AngularFireDatabase) {
    this.workflows = rtDb.list<IWorkflow>('workflows').valueChanges();
    this.JSON = JSON;
   }

  ngOnInit() {
    this.mbdiv = document.getElementById('workflow-money-button');
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
    script.add(bsv.deps.Buffer.from(WORKFLOW));
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

  startWorkflow(txid) {
    this.workflowTxn = txid;
  }
}
