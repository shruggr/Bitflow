import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkflow, IState } from 'src/lib/bitflow-proto';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  workflows: Observable<IWorkflow[]>;
  workflowTxn: string;
  states: Observable<IState[]>;

  constructor(rtDb: AngularFireDatabase, private modalService: NgbModal) {
    this.workflows = rtDb.list<IWorkflow>('workflows').valueChanges();
    this.states = rtDb.list<IState>('state').valueChanges();
   }

  ngOnInit() {}

  openCreateModal(workflow) {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.componentInstance.workflow = workflow
  }

  openViewModal(state) {
    const modalRef = this.modalService.open(ViewComponent);
    modalRef.componentInstance.state = state
  }

  getOpenTask(state) {
    let task = state.tasks.find((task) => task.status == "Open");
    return task ? task.stage.name : '';
  }

  getDescription(state) {
    let field = state.values.find((field) => field.key == "description");
    return field ? field.value : '';
  }
}
