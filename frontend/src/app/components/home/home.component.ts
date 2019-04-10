import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { ReservationSearchComponent } from './../shared/reservation-search/reservation-search.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    @ViewChild(ReservationSearchComponent)
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;
    constructor() { }

    ngOnInit() {}
}
