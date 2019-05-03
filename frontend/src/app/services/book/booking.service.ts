import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Booking } from './../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookingResourcePrefix = '/reservations';
  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Get all the reservations for partner || admin
   */
  getAll(): Observable<Booking[]> {
    return this.apiService.post(`${this.bookingResourcePrefix}/`, {})
    .pipe(
      map (data => data.reservations )
    );
  }

  /**
   * Get all the reservations for client
   */
  getActive(): Observable<Booking[]> {
    return this.apiService.post(`${this.bookingResourcePrefix}/all`, {})
    .pipe(
      map (data => data.ads )
    );
  }


  /**
   * Validate a reservation by the owner partner
   * @param id reservation_id to be validate
   */
  validate(id): Observable<any> {
    return this.apiService.post(`${this.bookingResourcePrefix}/${id}/validate`, {});
  }

  /**
   * Cancel a reservation by the owner partner
   * @param id reservation_id to be cancel
   */
  cancel(id): Observable<any> {
    return this.apiService.post(`${this.bookingResourcePrefix}/${id}/cancel`, {});
  }

  /**
   * Get a single reservation by a partner
   * @param id reservation_id a partner want to get
   */
  get(id): Observable<Booking> {
    return this.apiService.post(`${this.bookingResourcePrefix}/${id}`, {});
  }

  /**
   * Create a reservation by a client
   * @param data ad's info to be booked
   */
  add(data): Observable<any>  {
    return this.apiService.post(`${this.bookingResourcePrefix}/create`, data);
  }

}
