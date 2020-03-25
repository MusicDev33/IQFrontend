import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { KatexModule } from 'ng-katex';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ClipboardModule } from 'ngx-clipboard';
import { ScrollEventModule } from 'ngx-scroll-event';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { HomeComponent } from '@pages/home/home.component';
import { RegisterComponent } from '@pages/register/register.component';
import { GoogleCBComponent } from '@pages/register/googlecb/googlecb.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthenticateComponent } from '@pages/authenticate/authenticate.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { QuestionComponent } from '@pages/question/question.component';
import { SearchpopupComponent } from '@dialogs/searchpopup/searchpopup.component';
import { LibraryComponent } from '@pages/library/library.component';
import { LibMobileComponent } from './pages/lib-mobile/lib-mobile.component';
import { BugReportComponent } from '@dialogs/bugreport/bugreport.component';
import { FormatbarComponent } from '@components/formatbar/formatbar.component';
import { LandingpageComponent } from '@pages/landingpage/landingpage.component';
import { UserSettingsComponent } from '@pages/usersettings/usersettings.component';
import { QuestionEditComponent } from '@dialogs/questionedit/questionedit.component';
import { CMDashboardComponent } from '@pages/cmagent/cmdashboard/cmdashboard.component';
import { TopicComponent } from '@pages/topic/topic/topic.component';
import { SourceComponent } from '@pages/source/source/source.component';
import { LandingNavComponent } from './components/landingnav/landingnav.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ConfirmationComponent } from '@dialogs/confirmation/confirmation.component';
import { SubjectListComponent } from '@components/subjectlist/subjectlist.component';
import { DiscoverComponent } from '@components/discover/discover.component';
import { LibraryListComponent } from '@components/librarylist/librarylist.component';
import { PricingComponent } from '@pages/pricing/pricing.component';
import { AdsLandingComponent } from '@pages/adslanding/adslanding.component';
import { LandingMobileComponent } from './pages/landing-mobile/landing-mobile.component';

// Jobs Module
import { IQJobsComponent } from '@pages/iqjobs/iqjobs.component';
import { CMAgentMasterComponent } from '@pages/admin/cmagentmaster/cmagentmaster.component';

// Dropins
import { QuestionCardComponent } from '@components/questioncard/questioncard.component';
import { AnswerBoxComponent } from '@components/answerbox/answerbox.component';

// Support
import { SupportComponent } from '@pages/support/support.component';
import { AboutComponent } from '@pages/about/about.component';
import { IntroComponent } from '@pages/support/intro/intro.component';
import { HowtoComponent } from '@pages/support/howto/howto.component';
import { PolicyComponent } from '@pages/policy/policy.component';
import { MathComponent } from '@pages/support/math/math.component';
import { HonorCodeComponent } from '@pages/support/honorcode/honorcode.component';
import { AdvintroComponent } from '@pages/support/advintro/advintro.component';

// Services - NETWORK
import { ValidateService } from '@services/utility/validate.service';
import { QuestionService } from '@services/question.service';
import { AnswerService } from '@services/answer.service';
import { VotesService } from '@services/votes.service';
import { SubjectsService } from '@services/subjects.service';
import { SourceService } from '@services/source.service';
import { SearchService } from '@services/search.service';
import { UserService } from '@services/user.service';
import { FeedbackService } from '@services/feedback.service';
import { IQAuthService } from '@services/backend/iqauth.service';
import { JobAppsService } from '@services/backend/jobapps.service';
import { CMAgentService } from '@services/backend/cmagent.service';

// Services - UTILITY

// Interactivity Lab
import { InteractLabComponent } from '@pages/interactlab/interactlab.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ProductionGuard } from './guards/production.guard';
import { GSigninGuard } from './guards/gsignin.guard';

// Social Login
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angularx-social-login';

import googleSocialConfig from './socialLoginConfig';
import { ReportQuestionComponent } from '@dialogs/reportquestion/reportquestion.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function provideConfig() {
  return googleSocialConfig;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    AuthenticateComponent,
    DashboardComponent,
    QuestionComponent,
    ProfileComponent,
    SearchpopupComponent,
    SupportComponent,
    AboutComponent,
    IntroComponent,
    HowtoComponent,
    PolicyComponent,
    MathComponent,
    LibraryComponent,
    BugReportComponent,
    FormatbarComponent,
    LandingpageComponent,
    HonorCodeComponent,
    AdvintroComponent,
    UserSettingsComponent,
    GoogleCBComponent,
    QuestionEditComponent,
    ReportQuestionComponent,
    IQJobsComponent,
    CMDashboardComponent,
    CMAgentMasterComponent,
    TopicComponent,
    NotFoundComponent,
    SourceComponent,
    LandingNavComponent,
    PricingComponent,
    QuestionCardComponent,
    AnswerBoxComponent,
    InteractLabComponent,
    ConfirmationComponent,
    SubjectListComponent,
    DiscoverComponent,
    LibraryListComponent,
    AdsLandingComponent,
    LibMobileComponent,
    LandingMobileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    KatexModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    MatDialogModule ,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    SocialLoginModule,
    ClipboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ScrollEventModule
  ],
  providers: [
    ValidateService,
    QuestionService,
    AnswerService,
    AuthGuard,
    LoginGuard,
    ProductionGuard,
    GSigninGuard,
    VotesService,
    SubjectsService,
    SearchService,
    SourceService,
    UserService,
    FeedbackService,
    IQAuthService,
    JobAppsService,
    CMAgentService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  entryComponents: [
    SearchpopupComponent,
    BugReportComponent,
    QuestionEditComponent,
    ReportQuestionComponent,
    ConfirmationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
