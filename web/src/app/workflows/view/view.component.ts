import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IState } from 'src/lib/bitflow-proto';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() state: IState
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
