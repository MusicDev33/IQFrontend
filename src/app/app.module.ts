import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { MatDialogModule } from '@angular/material'
import {MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { ProfileComponent } from './components/profile/profile.component'

import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service'
import { QuestionService } from './services/question.service';
import { AnswerService } from './services/answer.service';

import { AuthGuard } from './guards/auth.guard';
import { QuestionComponent } from './components/question/question.component'
import { SearchpopupComponent } from './components/searchpopup/searchpopup.component'

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
    SearchpopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    MatDialogModule ,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    ValidateService,
    AuthService,
    QuestionService,
    AnswerService,
    AuthGuard],
  entryComponents: [SearchpopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
