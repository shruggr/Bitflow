import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkflow } from 'src/lib/bitflow-proto';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  workflows: Observable<IWorkflow[]>;
  workflowTxn: string;

  constructor(rtDb: AngularFireDatabase, private modalService: NgbModal) {
    this.workflows = rtDb.list<IWorkflow>('workflows').valueChanges();
   }

  ngOnInit() {}

  openModal(workflow) {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.componentInstance.workflow = workflow
  }
}
