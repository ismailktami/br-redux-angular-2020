import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {AuthGardService} from './services/auth-gard.service';
import {UsersComponent} from './users/users.component';
import {RolesComponent} from './users/roles/roles.component';
import {AddComponent} from './users/add/add.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'home' , component: HomeComponent, canActivate: [AuthGardService]},
  {path: 'users' , component: UsersComponent, canActivate: [AuthGardService]
    , children: [
      {path: 'add', component: AddComponent},
      {path: ':id', component: RolesComponent}
    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
