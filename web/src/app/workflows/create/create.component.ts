import { Component, OnInit, Input } from '@angular/core';
import { IWorkflow, IStage } from 'src/lib/bitflow-proto';
import { REQUEST } from 'src/lib/constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare const moneyButton;
declare const bsv;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() workflow: IWorkflow;
  stage: IStage;
  data: any = {};
  txid: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.stage = this.workflow.stages[0];
    this.updateMoneybutton();
  }

  updateMoneybutton() {
    const outputs: any[] = [
      {
        type: 'SCRIPT',
        script: bsv.Script.buildDataOut([
          bsv.deps.Buffer.from(REQUEST),
          bsv.deps.Buffer.from(this.workflow.txid),
          bsv.deps.Buffer.from(JSON.stringify(this.data))
        ]).toASM(),
        amount: 0,
        currency: 'BSV'
      }

    ];
    if(this.stage && this.stage.funds) {
      outputs.push({
        address: this.stage.payee,
        amount: this.stage.funds / 100000000,
        currency: 'BSV'
      })
    }
    moneyButton.render(document.getElementById('create-moneybutton'), {
      label: 'Upload',
      outputs,
      disabled: !this.stage || this.txid,
      onPayment: (payment) => {
        this.txid = payment.txid;
        this.updateMoneybutton();
        // this.activeModal.dismiss();
      }
    })
  }

}