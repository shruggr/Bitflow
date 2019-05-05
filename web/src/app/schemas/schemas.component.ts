import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISchema } from 'src/lib/bitflow-proto';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.css']
})
export class SchemasComponent implements OnInit {
  schemas: Observable<ISchema[]>;

  constructor(rtDb: AngularFireDatabase) {
    this.schemas = rtDb.list<ISchema>('schemas').valueChanges();
   }

  ngOnInit() {
  }

}
