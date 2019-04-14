import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './../../../models/car.model';
import { ApiService } from '../../api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private carResourcePrefix = '/cars';

  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Car[]> {
    return this.apiService.post(`${this.carResourcePrefix}/`, {})
    .pipe(
      map (data => data.cars )
    );
  }

  get(id): Observable<Car> {
    return this.apiService.post(`${this.carResourcePrefix}/${id}`, {});
  }

  update(car: Car): Observable<Car> {
    return this.apiService.post(`${this.carResourcePrefix}/update`, car);
  }

  add(car: Car): Observable<any> {
    return this.apiService.post(`${this.carResourcePrefix}/create`, car);
  }

}
