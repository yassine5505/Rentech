import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.scss'],
  styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})
export class ReservationSearchComponent implements OnInit {
  public model1: NgbDateStruct;
  public model2: NgbDateStruct;
  selected: {startdDate: Date, endDate: Date};
  constructor() { }
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
      return date.month !== current.month;
  }
  ngOnInit() {
    const inputGroupFocus = document.getElementsByClassName('form-control');
    const inputGroup = document.getElementsByClassName('input-group');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < inputGroup.length; i++) {
        inputGroup[i].children[0].addEventListener('focus',  () => {
            inputGroup[i].classList.add('input-group-focus');
        });
        inputGroup[i].children[0].addEventListener('blur', () => {
            inputGroup[i].classList.remove('input-group-focus');
        });
    }
}
}
