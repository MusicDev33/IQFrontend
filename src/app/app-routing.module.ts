import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '@pages/register/register.component';
import { AuthenticateComponent } from '@pages/authenticate/authenticate.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { QuestionComponent } from '@pages/question/question.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { LibraryComponent } from '@pages/library/library.component';
import { LandingpageComponent } from '@pages/landingpage/landingpage.component';
import { UserSettingsComponent } from '@pages/usersettings/usersettings.component';
import { GoogleCBComponent } from '@pages/register/googlecb/googlecb.component';
import { IQJobsComponent } from '@pages/iqjobs/iqjobs.component';
import { CMAgentMasterComponent } from '@pages/admin/cmagentmaster/cmagentmaster.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { TopicComponent } from '@pages/topic/topic/topic.component';
import { SourceComponent } from '@pages/source/source/source.component';
import { PricingComponent } from '@pages/pricing/pricing.component';
import { InteractLabComponent } from '@pages/interactlab/interactlab.component';
import { AdsLandingComponent } from '@pages/adslanding/adslanding.component';

import { AboutComponent } from '@pages/about/about.component';
import { PolicyComponent } from '@pages/policy/policy.component';

// SUPPORT
import { SupportComponent } from '@pages/support/support.component';
import { IntroComponent } from '@pages/support/intro/intro.component';
import { HowtoComponent } from '@pages/support/howto/howto.component';
import { MathComponent } from '@pages/support/math/math.component';
import { HonorCodeComponent } from '@pages/support/honorcode/honorcode.component';
import { AdvintroComponent } from '@pages/support/advintro/advintro.component';

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
  { path: 'iqt/:topic', component: TopicComponent},
  { path: 'iqs/:source', component: SourceComponent},
  { path: 'pricing', component: PricingComponent, canActivate: [ProductionGuard]},
  { path: 'ilab', component: InteractLabComponent, canActivate: [ProductionGuard]},
  { path: 'business/iqads', component: AdsLandingComponent, canActivate: [ProductionGuard]},
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
