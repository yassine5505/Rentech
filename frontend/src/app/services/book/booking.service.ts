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
  getAll(): Observable<Booking[]> {
    return this.apiService.post(`${this.bookingResourcePrefix}/`, {})
    .pipe(
      map (data => data.reservations )
    );
  }

  getActive(): Observable<Booking[]> {
    return this.apiService.post(`${this.bookingResourcePrefix}/all`, {})
    .pipe(
      map (data => data.ads )
    );
  }

  get(id): Observable<Booking> {
    return this.apiService.post(`${this.bookingResourcePrefix}/${id}`, {});
  }

  add(data): Observable<any>  {
    return this.apiService.post(`${this.bookingResourcePrefix}/create`, data);
  }

}
