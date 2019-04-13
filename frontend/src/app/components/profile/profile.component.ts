import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User = null;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }

}
