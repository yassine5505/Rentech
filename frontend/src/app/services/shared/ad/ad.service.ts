import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Ad } from './../../../models/ad.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  adResourcePrefix = '/ads';
  constructor(
    private apiService: ApiService
  ) { }
  getAll(): Observable<Ad[]> {
    return this.apiService.post(`${this.adResourcePrefix}/`, {})
    .pipe(
      map (data => data.ads )
    );
  }

  getActive(): Observable<Ad[]> {
    return this.apiService.post(`${this.adResourcePrefix}/all`, {})
    .pipe(
      map (data => data.ads )
    );
  }

  get(data): Observable<Ad> {
    return this.apiService.post(`${this.adResourcePrefix}/${data}/show`,  {} );
  }

  add(data): Observable<any>  {
    return this.apiService.post(`${this.adResourcePrefix}/create`, data);
  }
}
