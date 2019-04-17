import { Component, OnInit } from '@angular/core';
import { CarService } from './../../../services/shared/car/car.service';
import { Car } from './../../../models/car.model';

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.scss']
})
export class MycarsComponent implements OnInit {
  myCars: Car[] = [];
  constructor(
    private carService: CarService
  ) { }

  ngOnInit() {
    this.carService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.myCars = data;
      },
      (error) => {
      }
    );
  }

}
