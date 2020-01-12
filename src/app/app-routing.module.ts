import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '@components/register/register.component';
import { AuthenticateComponent } from '@components/authenticate/authenticate.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { QuestionComponent } from '@components/question/question.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { LibraryComponent } from '@components/library/library.component';
import { LandingpageComponent } from '@components/landingpage/landingpage.component';
import { UserSettingsComponent } from '@components/usersettings/usersettings.component';
import { GoogleCBComponent } from './components/register/googlecb/googlecb.component';
import { IQJobsComponent } from './components/iqjobs/iqjobs.component';
import { CMAgentMasterComponent } from './components/admin/cmagentmaster/cmagentmaster.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AboutComponent } from '@components/about/about.component';
import { PolicyComponent } from '@components/policy/policy.component';

// SUPPORT
import { SupportComponent } from '@components/support/support.component';
import { IntroComponent } from '@components/support/intro/intro.component';
import { HowtoComponent } from '@components/support/howto/howto.component';
import { MathComponent } from '@components/support/math/math.component';
import { HonorCodeComponent } from '@components/support/honorcode/honorcode.component';
import { AdvintroComponent } from '@components/support/advintro/advintro.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ProductionGuard } from './guards/production.guard';
import { GSigninGuard } from './guards/gsignin.guard';

/* Don't forget these
{ path: 'policy', component: PolicyComponent},

*/

const routes: Routes = [
  { path: '', component: AuthenticateComponent, canActivate: [LoginGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'authenticate', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: AuthenticateComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'dashboard/:subject', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'question/:id', component: QuestionComponent},
  { path: 'profile/:handle', component: ProfileComponent},
  { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard]},
  { path: 'support', component: SupportComponent},
  { path: 'support/intro', component: IntroComponent},
  { path: 'support/howto', component: HowtoComponent},
  { path: 'support/advintro', component: AdvintroComponent},
  { path: 'support/honorcode', component: HonorCodeComponent},
  { path: 'support/math', component: MathComponent},
  { path: 'policy', component: PolicyComponent},
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
  { path: 'landing', component: LandingpageComponent, canActivate: [ProductionGuard]},
  { path: 'gsignincb', component: GoogleCBComponent, canActivate: [GSigninGuard]},
  { path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
  // { path: 'jobs', component: IQJobsComponent},
  // { path: 'admin/cmagent', component: CMAgentMasterComponent} // Add Admin guard to this!!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
