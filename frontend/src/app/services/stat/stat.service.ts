import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatService {

  statResourcePrefix = '/stat';
  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Get all the statistitics depending on the user role
   */
  getGlobalStatistics(): Observable<any> {
    return this.apiService.post(`${this.statResourcePrefix}/`, {});
  }
}
