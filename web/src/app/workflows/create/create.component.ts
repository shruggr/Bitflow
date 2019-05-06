import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IWorkflow } from 'src/lib/bitflow-proto';
import { Observable } from 'rxjs';
import { REQUEST } from 'src/lib/constants';

declare const moneyButton;
declare const bsv;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() txid: string;
  workflow: Observable<IWorkflow>;
  data: any = {};
  mbdiv: any;
  result: string;

  constructor(private rtDb: AngularFireDatabase) {}

  ngOnInit() {
    this.mbdiv = document.getElementById('create-money-button');
    this.workflow = this.rtDb.object<IWorkflow>(`workflows/${this.txid}`).valueChanges();
  }

  updateMoneybutton($event) {
    // let stage;
    // if(this.workflow) {
    //   stage = this.workflow.stages[0];
    // }
    let script = new bsv.Script();
    script.add(bsv.Opcode.OP_RETURN);
    script.add(bsv.deps.Buffer.from(REQUEST));
    script.add(bsv.deps.Buffer.from(JSON.stringify(this.data)));
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
      disabled: !this.workflow,
      onPayment: (payment) => {
        this.result = payment.txid;
      },
      onError: (error) => {
        this.result = `Error: ${error.message}`;
      }
    })
  }

}
