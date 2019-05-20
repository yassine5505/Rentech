import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ad } from './../../models/ad.model';
import { AdService } from './../../services/shared/ad/ad.service';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from './../../services/shared/loading-screen/loading-screen.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as  moment from 'moment';

@Component({
  selector: 'app-ads-page',
  templateUrl: './ads-page.component.html',
  styleUrls: ['./ads-page.component.scss']
})
export class AdsPageComponent implements OnInit, OnDestroy {
  // Reference to filter box Component
  @ViewChild('filterBox') filterBox: ElementRef;

  fromMinimun = new Date().toLocaleDateString();
  filteredAds: Ad[] = [];
  adSubscription: Subscription;
  // Fiter for search
  filter = {
    city_id:  null,
    from_date: null
  };
  error: string[] = [];
  constructor(
    private adService: AdService,
    private route: ActivatedRoute,
    private loaderService: LoadingScreenService,
  ) { }

  ngOnInit() {
    this.loaderService.startLoading();
    this.fromMinimun = new Date().toLocaleDateString();
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        this.filter.city_id = +params.get('city');
        this.filter.from_date = +params.get('from_date');
      }
    );
    this.adSubscription = this.adService.getActive().subscribe(
      (data) => {
        console.log(data);
        this.filteredAds = data;
        this.loaderService.stopLoading();
      },
      (error) => {
        this.handleError(error);
        this.loaderService.stopLoading();
      },
      () => {
        if (this.filter.city_id || this.filter.from_date) {
          this.filteredAds = this.filteredAds.filter((ad: Ad) => {
            if (this.filter.city_id && this.filter.from_date) {
              return ad.city.id === this.filter.city_id
              && moment(ad.start_date).isSameOrAfter(moment(this.filter.from_date));
            }
            if (this.filter.city_id) {
              return ad.city.id === this.filter.city_id;
            }
            if (this.filter.from_date) {
              return moment(ad.start_date).isSameOrAfter(moment(this.filter.from_date));
            }
          });
        }
      }
    );
  }


  handleError(error) {
    if (error.message) {
      const errors = error.message;
      if ( errors.start_date || errors.end_date ) {
        this.error.push('Intervalle/format de dates incorrect !' );
      }
      if ( errors.description ) {
        this.error.push('Description très longue !' );
      }
      return;
    }
    this.error.push('Une erreur est survenue lors de la création de l\'annonce ! ' );

  }



  toggleFilter() {
    const filter: HTMLElement = this.filterBox.nativeElement;
    const classList = filter.classList;
    if (classList.contains('filter-is-visible')) {
      filter.classList.remove('filter-is-visible');
      return;
    }
    filter.classList.add('filter-is-visible');
  }

  ngOnDestroy(): void {
    this.adSubscription.unsubscribe();
  }



}
