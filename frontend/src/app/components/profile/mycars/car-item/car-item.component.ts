import { Component, OnInit, Input } from '@angular/core';
import { Car } from './../../../../models/car.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit {
  @Input() car: Car;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  announceCar(selectedCarId) {
    this.router.navigate(['../annoncer', {extraID: selectedCarId}],
     { relativeTo: this.activatedRoute});
  }

}
