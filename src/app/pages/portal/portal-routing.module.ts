import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Constants } from '@core/constants';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: '/portal/login',
      // },
      { path: Constants.Routing.FORGOT_PASSWORD.withoutSlash, component: ForgetPasswordComponent },
      { path: Constants.Routing.LOGIN.withoutSlash, component: LoginComponent },
      { path: Constants.Routing.REGISTER.withoutSlash, component: RegisterComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
