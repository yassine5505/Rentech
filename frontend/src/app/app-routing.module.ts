import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { BeforeLoginService } from './guards/before-login/before-login.service';
import { AfterLoginService } from './guards/after-login/after-login.service';
import { SignupComponent } from './components/signup/signup.component';
import { Role } from './models/role.model';
import { AuthGuard } from './guards/auth-guard/auth-guard';
import { OverviewComponent } from './components/profile/overview/overview.component';
import { MycarsComponent } from './components/profile/mycars/mycars.component';
import { AdsComponent } from './components/profile/ads/ads.component';
import { ClientHistoryComponent } from './components/profile/client-history/client-history.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { AddCarComponent } from './components/profile/mycars/add-car/add-car.component';
import { AdCreateComponent } from './components/profile/ads/ad-create/ad-create.component';
import { AdsPageComponent } from './components/ads-page/ads-page.component';
import { CardItemDetailsComponent } from './components/ads-page/card-item-details/card-item-details.component';
import { ReviewPageComponent } from './components/review/review-page/review-page.component';
import { ListReviewsComponent } from './components/review/review-page/list-reviews/list-reviews.component';
import { CreateReviewComponent } from './components/review/create-review/create-review.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { PartnerDashboardComponent } from './components/profile/partner-dashboard/partner-dashboard.component';
import { PartnerAdHistoryComponent } from './components/profile/ads/partner-ad-history/partner-ad-history.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ads',
    component: AdsPageComponent,
  },
  {
    path: 'ads/:id',
    component: CardItemDetailsComponent,
  },
  {
    path: 'score',
    component: ReviewPageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.PARTNER, Role.CLIENT] },
    children: [
      // Getting all my scores
      {
        path: '',
        component: ListReviewsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER, Role.CLIENT] }
      },

      // giving a score to someone
      {
        path: 'evaluer',
        component: CreateReviewComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER, Role.CLIENT] }
      }
    ]
  },

  // Admin zone
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER, Role.CLIENT, Role.ADMIN] }
      },
      {
        path: 'edit',
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER, Role.CLIENT, Role.ADMIN] }
      },
      {
        path: 'cars',
        component: MycarsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER] }
      },
      {
        path: 'newcar',
        component: AddCarComponent
      },
      {
        path: 'reservations',
        component: AdsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER] }
      },
      {
        path: 'annoncer',
        component: AdCreateComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER] }
      },
      {
        path: 'history',
        component: ClientHistoryComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.CLIENT] }
      },

      // Partner zone
      {
        path: 'partner-dashboard',
        component: PartnerDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER] }
      },
      {
        path: 'my-ads',
        component: PartnerAdHistoryComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.PARTNER] }
      },

    ]
  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
