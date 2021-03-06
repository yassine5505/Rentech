import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { AppComponent } from './app.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

import { HomeComponent } from './components/home/home.component';

import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TokenService } from './services/authentication/token.service';
import { AuthService } from './services/authentication/auth.service';
import { AfterLoginService } from './guards/after-login/after-login.service';
import { BeforeLoginService } from './guards/before-login/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ReservationSearchComponent } from './components/shared/reservation-search/reservation-search.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { StarRatingModule, StarRatingComponent } from 'angular-star-rating';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoadingScreenComponent } from './components/shared/loading-screen/loading-screen.component';
import { OverviewComponent } from './components/profile/overview/overview.component';
import { MycarsComponent } from './components/profile/mycars/mycars.component';
import { AdsComponent } from './components/profile/ads/ads.component';
import { ClientHistoryComponent } from './components/profile/client-history/client-history.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { CarItemComponent  } from './components/profile/mycars/car-item/car-item.component';
import { AddCarComponent } from './components/profile/mycars/add-car/add-car.component';
import { AdCreateComponent } from './components/profile/ads/ad-create/ad-create.component';
import { AdsPageComponent } from './components/ads-page/ads-page.component';
import { CardItemComponent } from './components/ads-page/card-item/card-item.component';
import { RibonComponent } from './components/shared/ribon/ribon.component';
import { CardItemDetailsComponent } from './components/ads-page/card-item-details/card-item-details.component';
import { PreviewItemComponent } from './components/shared/preview-item/preview-item.component';
import { CreateReviewComponent } from './components/review/create-review/create-review.component';
import { ReviewPageComponent } from './components/review/review-page/review-page.component';
import { ListReviewsComponent } from './components/review/review-page/list-reviews/list-reviews.component';
import { ReviewItemComponent } from './components/shared/review-item/review-item.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PartnerDashboardComponent } from './components/profile/partner-dashboard/partner-dashboard.component';
import { PartnerAdHistoryComponent } from './components/profile/ads/partner-ad-history/partner-ad-history.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ReservationSearchComponent,
    LoadingScreenComponent,
    OverviewComponent,
    MycarsComponent,
    AdsComponent,
    ClientHistoryComponent,
    ProfileEditComponent,
    CarItemComponent,
    AddCarComponent,
    AdCreateComponent,
    AdsPageComponent,
    CardItemComponent,
    RibonComponent,
    CardItemDetailsComponent,
    PreviewItemComponent,
    CreateReviewComponent,
    ReviewPageComponent,
    ListReviewsComponent,
    ReviewItemComponent,
    AdminDashboardComponent,
    FooterComponent,
    PartnerDashboardComponent,
    PartnerAdHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    StarRatingModule.forRoot(),
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    UiSwitchModule
  ],
  providers: [
    AuthenticationService,
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StarRatingComponent),
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
