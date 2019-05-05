import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Workflow, IWorkflow } from 'src/lib/bitflow-proto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() txid: string;
  workflow: Observable<IWorkflow>;

  constructor(rtDb: AngularFireDatabase) {
    this.workflow = rtDb.object<IWorkflow>(`workflows/${this.txid}`).valueChanges();
   }

  ngOnInit() {
  }

}
