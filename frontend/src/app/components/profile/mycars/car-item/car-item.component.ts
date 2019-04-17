import { Component, OnInit, Input } from '@angular/core';
import { Car } from './../../../../models/car.model';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  constructor() { }

  ngOnInit() {
  }

}
