import { Component, OnInit } from '@angular/core';

import { User } from './../../../models';
import { AuthService } from './../../../services/authentication/auth.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  currentUser: User = null;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }
  closeAlert() {

  }

}
