import { Component, OnInit, Input } from '@angular/core';
import { Score } from './../../../models/score.model';

@Component({
  selector: 'app-preview-item',
  templateUrl: './preview-item.component.html',
  styleUrls: ['./preview-item.component.scss']
})
export class PreviewItemComponent implements OnInit {

  @Input() score: Score;
  constructor() { }

  ngOnInit() {
  }

}
