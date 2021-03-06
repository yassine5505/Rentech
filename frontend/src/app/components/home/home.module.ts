import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import {ReservationSearchComponent} from './../shared/reservation-search/reservation-search.component';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ReservationSearchComponent,
        NgxDaterangepickerMd.forRoot()
    ],
    declarations: [ HomeComponent, ReservationSearchComponent ],
    exports: [ HomeComponent ],
    providers: []
})
export class HomeModule { }
