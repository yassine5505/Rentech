import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './../../../../app/services/book/booking.service';

import { User, Booking } from './../../../models';
import { Ad } from './../../../models/ad.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.scss']
})
export class ClientHistoryComponent implements OnInit, OnDestroy {

  public reservations: Booking[];
  public error = [];
  public bookingSubscription: Subscription;

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookingSubscription = this.bookingService.getAll().subscribe(
      (success) => {
        this.reservations = success;
      },
      (error) => {
        console.log(error);
        this.error.push(error);
      },
      () => {

      }
    );

  }

  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }

}
