import { Component, OnInit } from '@angular/core';
import { CityService } from './../../../services/shared/city/city.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdService } from './../../../services/shared/ad/ad.service';
import { Car , City , User } from './../../../models';
import { DatePipe } from '@angular/common';
import { AuthService } from './../../../services/authentication/auth.service';
@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.scss'],
})
export class ReservationSearchComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public from_date;
  // tslint:disable-next-line:variable-name
  public city_id;
  cities: City[] = [];
  citySubscription: Subscription;
  constructor(
    private router: Router,
    private cityService: CityService,
  ) { }

  ngOnInit() {
    this.citySubscription = this.cityService.getAll().subscribe(
      (data) => {
        this.cities = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchAds() {
    this.router.navigate(
      ['/ads'],
     {queryParams: {city : this.city_id , from_date : this.from_date.endDate}}
    );
  }

}
