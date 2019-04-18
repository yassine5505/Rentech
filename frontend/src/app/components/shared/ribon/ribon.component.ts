import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ribon',
  templateUrl: './ribon.component.html',
  styleUrls: ['./ribon.component.scss']
})
export class RibonComponent implements OnInit {
  @Input() text;
  constructor() { }

  ngOnInit() {
  }

}
