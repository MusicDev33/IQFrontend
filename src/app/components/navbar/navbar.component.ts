import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { QuestionService } from '../../services/question.service'
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  questionText: String;

  constructor(
    private flashMsg: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private questionService: QuestionService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout()
    this.flashMsg.show('Successfully logged out.', {
      cssClass:'alert-success',
      timeout:2000
    })
    this.router.navigate(['/authenticate'])
    return false
  }

  onProfileClick(){
    var profileURL = "/profile/" + this.authService.getUserHandle()
    this.router.navigate([profileURL])
  }

  onAskSubmit(form: NgForm){
    const question = {
      question: this.questionText,
      subject: "Physics",
      source: "Mastering Physics",
      asker: this.authService.getUser().name,
      askerID: this.authService.userMongoID()
    }

    this.questionService.askQuestion(question).subscribe(data => {
      var response: any = {}
      response = data
      if (response.success){
        this.flashMsg.show("Question added.", {cssClass: 'alert-success', timeout: 1500})
        form.reset();
        this.router.navigate(['/dashboard'])
      }else{
        this.flashMsg.show("Something went wrong. Try asking again.", {cssClass: 'alert-danger', timeout: 1500})
      }
    });

  }

}
