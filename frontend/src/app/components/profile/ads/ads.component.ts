import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { BookingService } from './../../../services/book/booking.service';
import { Subscription } from 'rxjs';
import { Booking } from './../../../models';
import { environment } from './../../../../environments/environment';
import { LoadingScreenService } from './../../../services/shared/loading-screen/loading-screen.service';

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
    private bookingService: BookingService,
    private loaderService: LoadingScreenService
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
    return  image ? environment.api_url  + '/image/' + image.id : './assets/img/logo.png';
  }

  validateReservation(clientReservation: Booking , reservation: HTMLElement) {
    this.loaderService.startLoading();
    this.bookingSubscription = this.bookingService.validate(clientReservation.id).subscribe(
      (success) => {
        reservation.classList.add('success');
        clientReservation.status = 1;
        this.loaderService.stopLoading();
      },
      (error) => {
        reservation.classList.add('error');
        this.loaderService.stopLoading();
        alert(error.message || 'Une erreur s\' produite !');
      },
      () => {
        // reservation.classList.add('hidden');
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

  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }
}
