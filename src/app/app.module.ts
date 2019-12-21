import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { KatexModule } from 'ng-katex';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { HomeComponent } from '@components/home/home.component';
import { RegisterComponent } from '@components/register/register.component';
import { GoogleCBComponent } from './components/register/googlecb/googlecb.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { AuthenticateComponent } from '@components/authenticate/authenticate.component';
import { ProfileComponent } from '@components/profile/profile.component';
import { QuestionComponent } from '@components/question/question.component';
import { SearchpopupComponent } from '@components/searchpopup/searchpopup.component';
import { LibraryComponent } from '@components/library/library.component';
import { BugReportComponent } from '@components/bugreport/bugreport.component';
import { FormatbarComponent } from '@components/formatbar/formatbar.component';
import { LandingpageComponent } from '@components/landingpage/landingpage.component';
import { UserSettingsComponent } from './components/usersettings/usersettings.component';
import { QuestionEditComponent } from './components/questionedit/questionedit.component';
import { CMDashboardComponent } from './modules/cmagent/cmdashboard/cmdashboard.component';


// Jobs Module
import { IQJobsComponent } from './components/iqjobs/iqjobs.component';
import { CMAgentMasterComponent } from './components/admin/cmagentmaster/cmagentmaster.component';

// Dropins
import { QuestionBoxComponent } from './components/dropins/questionbox/questionbox.component';

// Support
import { SupportComponent } from '@components/support/support.component';
import { AboutComponent } from '@components/about/about.component';
import { IntroComponent } from '@components/support/intro/intro.component';
import { HowtoComponent } from '@components/support/howto/howto.component';
import { PolicyComponent } from '@components/policy/policy.component';
import { MathComponent } from '@components/support/math/math.component';
import { HonorCodeComponent } from '@components/support/honorcode/honorcode.component';
import { AdvintroComponent } from '@components/support/advintro/advintro.component';

// Services - NETWORK
import { ValidateService } from '@services/utility/validate.service';
import { AuthService } from '@services/auth.service';
import { QuestionService } from '@services/question.service';
import { AnswerService } from '@services/answer.service';
import { IpgenService } from '@services/ipgen.service';
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
import { ReportQuestionComponent } from './components/reportquestion/reportquestion.component';

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
    QuestionBoxComponent,
    ReportQuestionComponent,
    IQJobsComponent,
    CMDashboardComponent,
    CMAgentMasterComponent
  ],
  imports: [
    BrowserModule,
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
    SocialLoginModule
  ],
  providers: [
    ValidateService,
    AuthService,
    QuestionService,
    AnswerService,
    AuthGuard,
    LoginGuard,
    ProductionGuard,
    GSigninGuard,
    IpgenService,
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
  entryComponents: [SearchpopupComponent, BugReportComponent, QuestionEditComponent, ReportQuestionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
