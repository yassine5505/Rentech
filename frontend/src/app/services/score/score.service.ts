import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { Review } from './../../models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  scoreResourcePrefix = '/scores';
  constructor(
    private apiService: ApiService
  ) { }


  /**
   * Verify if the given reservation has been scored by the user
   * @param reservationId reservation_id to get
   */
  verifyReservationScore(reservationId): Observable<any> {
    return this.apiService.post(`${this.scoreResourcePrefix}/verify`, reservationId);
  }

  /**
   * Get reservation scores
   * @param id reservation_id to get
   */
  get(id): Observable<Review> {
    return this.apiService.post(`${this.scoreResourcePrefix}/${id}`, {});
  }

  /**
   * Create an user score
   * @param data car score + reservations infos
   */
  addUserScore(data): Observable<any>  {
    return this.apiService.post(`${this.scoreResourcePrefix}/user`, data);
  }

  /**
   * Create a car score only by a client
   * @param data car score infos
   */
  addCarScore(data): Observable<any>  {
    return this.apiService.post(`${this.scoreResourcePrefix}/car`, data);
  }

}
