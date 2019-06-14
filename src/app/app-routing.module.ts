import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'
import { AuthenticateComponent } from './components/authenticate/authenticate.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { QuestionComponent } from './components/question/question.component'
import { ProfileComponent } from './components/profile/profile.component'

import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {path:'', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'authenticate', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: AuthenticateComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'question/:id', component: QuestionComponent},
  {path: 'profile/:urlName', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
