import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { mergeMap } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SearchpopupComponent } from '../searchpopup/searchpopup.component';
import { DebugService } from '../../services/debug.service';

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

  constructor(
    public flashMsg: FlashMessagesService,
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
    public questionService: QuestionService,
    public dialog: MatDialog,
    public debug: DebugService,
    public searchService: SearchService) {

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
    this.flashMsg.show('Successfully logged out.', {
      cssClass: 'alert-success',
      timeout: 2000
    });
    this.router.navigate(['/authenticate']);
    return false;
  }

  onProfileClick() {
    const profileURL = '/profile/' + this.userService.getUser().handle;
    this.router.navigate([profileURL]);
  }

  onSearchKeyup() {

  }

  searchNoResults(noResults: boolean) {

  }

  searchResultSelected(selectedObject: any) {

  }

  onSearchTypeahead() {

  }

  onAskSubmit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.position = {
      top: '80px'
    };

    dialogConfig.data = {
      description: 'A cool test dialog!!!',
      question: '',
    };
    const dialogRef = this.dialog.open(SearchpopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe( data => {
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

        this.questionService.askQuestion(question).subscribe(data => {
          let response: any = {};
          response = data;
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
}
