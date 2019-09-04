import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SearchpopupComponent } from '../searchpopup/searchpopup.component';
import { DebugService } from '../../services/debug.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  questionText: String;

  constructor(
    public flashMsg: FlashMessagesService,
    public authService: AuthService,
    public router: Router,
    public questionService: QuestionService,
    public dialog: MatDialog,
    public debug: DebugService) { }

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
    const profileURL = '/profile/' + this.authService.getUserHandle();
    this.router.navigate([profileURL]);
  }

  onAskSubmit() {
    /*
    const question = {
      question: this.questionText,
      subject: 'Physics',
      source: 'Mastering Physics',
      asker: this.authService.getUser().name,
      askerID: this.authService.userMongoID()
    }

    this.questionService.askQuestion(question).subscribe(data => {
      var response: any = {}
      response = data
      if (response.success){
        this.flashMsg.show('Question added.', {cssClass: 'alert-success', timeout: 1500})
        form.reset();
        this.router.navigate(['/dashboard'])
      }else{
        this.flashMsg.show('Something went wrong. Try asking again.', {cssClass: 'alert-danger', timeout: 1500})
      }
    });
    */

    var dialogConfig = new MatDialogConfig();
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
        var res: any = {}
        res = data;
        this.debug.log('Dialog output: ' + data);
        const question = {
          question: res.question,
          subject: res.topic,
          source: res.source,
          asker: this.authService.getUser().name,
          askerID: this.authService.userMongoID(),
          askerHandle: this.authService.getUserHandle()
        };
        this.debug.log(question);
        this.questionService.askQuestion(question).subscribe(data => {
          var response: any = {};
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
