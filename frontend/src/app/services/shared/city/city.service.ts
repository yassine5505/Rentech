import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { City } from './../../../models/city.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cityResourcePrefix = '/cities';
  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<City[]> {
    return this.apiService.post(`${this.cityResourcePrefix}/`, {})
    .pipe(
      map (data => data.cities )
    );
  }

  get(id): Observable<City> {
    return this.apiService.post(`${this.cityResourcePrefix}/${id}`, {});
  }

}
