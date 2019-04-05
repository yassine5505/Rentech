import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public error = [];
  public form = {
    email : null,
    password : null,
    password_confirmation: null,
    resetToken : null
  };

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private Notify: SnotifyService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params.token;
    });
  }

  onSubmit() {
   this.authenticationService.changePassword(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
   );
  }
  handleResponse(data) {

    const routerCpy = this.router;
    this.Notify.confirm('Done!, Now login with new Password', {
      buttons: [
        {text: 'Okay',
        action: toster => {
           routerCpy.navigateByUrl('/login'),
           this.Notify.remove(toster.id);
          }
      },
      ]
    });
  }

  handleError(error) {
    this.error = error.error.errors;
  }
  ngOnInit() {
  }

}
