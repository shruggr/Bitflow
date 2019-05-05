import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IWorkflow, ISchema } from 'src/lib/bitflow-proto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() txid: string;
  workflow: Observable<IWorkflow>;
  schemas: Observable<ISchema[]>;

  constructor(private rtDb: AngularFireDatabase) {
    this.schemas = rtDb.list<ISchema>('schemas').valueChanges();
  }

  ngOnInit() {
    this.workflow = this.rtDb.object<IWorkflow>(`workflows/${this.txid}`).valueChanges();
  }

}
