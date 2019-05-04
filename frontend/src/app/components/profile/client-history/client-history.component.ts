import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './../../../../app/services/book/booking.service';

import { User, Booking } from './../../../models';
import { Ad } from './../../../models/ad.model';
import { Subscription } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { LoadingScreenService } from './../../../services/shared/loading-screen/loading-screen.service';

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
    private bookingService: BookingService,
    private loaderService: LoadingScreenService
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


  cancelReservation(clientReservation: Booking , reservation: HTMLElement) {
    this.loaderService.startLoading();
    this.bookingSubscription = this.bookingService.cancel(clientReservation.id).subscribe(
      (success) => {
        this.loaderService.stopLoading();
        alert('Reservation annulée avec succès !');
      },
      (error) => {
        reservation.classList.add('error');
        this.loaderService.stopLoading();
        alert(error.message || 'Une erreur s\' produite !');
      },
      () => {
        reservation.classList.add('hidden');
      }
    );
  }

  getImage(image) {
    return  environment.api_url + '/image/' + image.id;
  }

  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }

}
