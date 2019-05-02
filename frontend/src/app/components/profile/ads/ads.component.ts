import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { BookingService } from './../../../services/book/booking.service';
import { Subscription } from 'rxjs';
import { Booking } from './../../../models';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit , OnDestroy {

  public bookingSubscription: Subscription;
  public reservations: Booking[];
  public error = [];
  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
   this.fetchBooking();
  }

  fetchBooking() {
    this.bookingSubscription = this.bookingService.getAll().subscribe(
      (success) => {
        this.reservations = success;
      },
      (error) => {
        console.log(error);
        this.error.push(error);
      },
      () => {

      },

    );
  }

  getImage(image) {
    return  environment.api_url + '/image/' + image.id;
  }

  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }
}
