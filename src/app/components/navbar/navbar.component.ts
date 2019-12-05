import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { mergeMap } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

import { IQAuthService } from '@services/backend/iqauth.service';
import { UserService } from '@services/user.service';
import { SearchService } from '@services/search.service';
import { QuestionService } from '@services/question.service';
import { DebugService } from '@services/utility/debug.service';
import { AuthService } from 'angularx-social-login';

import { SearchpopupComponent } from '@components/searchpopup/searchpopup.component';
import { BugReportComponent } from '@components/bugreport/bugreport.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  questionText: string;
  searchText = '';
  searchResults = [];
  searchDataSource: Observable<any>;
  asyncSelected: string;

  dialogOpen = false;

  constructor(
    public flashMsg: FlashMessagesService,
    public authService: IQAuthService,
    public userService: UserService,
    public router: Router,
    public questionService: QuestionService,
    public dialog: MatDialog,
    public debug: DebugService,
    public searchService: SearchService,
    public activatedService: ActivatedRoute,
    public socialAuthService: AuthService) {

      this.searchDataSource = Observable.create((observer: any) => {
          observer.next(this.searchText);
      }).mergeMap((token: string) => {
          return this.searchService.searchEverythingTypeahead(token);
      });
    }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.socialSignOut();
    window.location.reload();
    this.flashMsg.show('Successfully logged out.', {
      cssClass: 'alert-success',
      timeout: 2000
    });
    return false;
  }

  onProfileClick() {
    const profileURL = '/profile/' + this.userService.getUser().handle;
    this.router.navigate([profileURL]);
  }

  onSearchKeyup(): void {

  }

  searchNoResults(noResults: boolean): void {

  }

  searchResultSelected(selectedObject: any) {
    this.searchText = '';
    switch (selectedObject.item.type) {
      case 'user':
        this.userSelected(selectedObject.item);
        break;
      case 'source':
        this.sourceSelected(selectedObject.item);
        break;
      case 'subject':
        this.subjectSelected(selectedObject.item);
        break;
      case 'question':
        this.questionSelected(selectedObject.item);
        break;
    }
  }

  userSelected(user: any) {
    const profileURL = '/profile/' + user.handle;
    this.router.navigate([profileURL]);
  }

  sourceSelected(source: any) {
    // Do stuff here
  }

  subjectSelected(subject: any) {

  }

  questionSelected(question: any) {
    const questionURL = this.questionService.questionTextToURL(question.name);
    const routeURL = '/question/' + questionURL;
    this.router.navigate([routeURL]);
  }

  onAskSubmit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.position = {
      top: '80px'
    };
    dialogConfig.panelClass = 'dialog-popup';

    dialogConfig.data = {
      description: '',
      question: '',
    };

    this.dialogOpen = true;
    const dialogRef = this.dialog.open(SearchpopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
      this.dialogOpen = false;
      // Lol this isn't a request response but oh well
      if (data) {
        let res: any = {};
        res = data;
        this.debug.log('Dialog output: ' + res);
        const question = {
          question: res.question,
          subject: res.topic,
          source: res.source,
          asker: this.userService.getUser().name,
          askerID: this.userService.userMongoID(),
          askerHandle: this.userService.getUser().handle,
          tags: res.tags.value.split('&')
        };
        this.debug.log(question);

        this.questionService.askQuestion(question).subscribe(questionData => {
          let response: any = {};
          response = questionData;
          if (response.success) {
            this.flashMsg.show('Question added.', {cssClass: 'alert-success', timeout: 1500});
            this.router.navigate(['/dashboard']);
          } else {
            this.flashMsg.show('Something went wrong. Try asking again.', {cssClass: 'alert-danger', timeout: 1500});
          }
        });
      }
    });
  }

  onFeedbackSubmit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.position = {
      top: '80px'
    };
    dialogConfig.panelClass = 'dialog-popup';

    const dialogRef = this.dialog.open(BugReportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( feedback => {
      if (feedback) {
        this.flashMsg.show(feedback, {cssClass: 'alert-success', timeout: 1500});
      }
    });
  }

  socialSignOut(): void {
    this.socialAuthService.signOut();
  }
}
