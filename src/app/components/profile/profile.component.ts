import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { QuestionService } from '../../services/question.service'
import { AnswerService } from '../../services/answer.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'
<<<<<<< HEAD
import { flatMap } from 'rxjs/operators'
=======
import { MatDialog, MatDialogConfig } from '@angular/material'
import { SearchpopupComponent } from '../searchpopup/searchpopup.component';
>>>>>>> 7b825fe39a11d7794dde602e9bf9747124dd6018


enum ContentView {
  answers,
  questions
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object
  userHandle: String

  // Current user is the user to whom the profile page belongs to
  // User is the user using the browser
  currentUser: any = {}

  userMatch: Boolean
  view: ContentView

  userQuestions: Array<Object>
  userAnswers: Array<Object>

  constructor(private authService: AuthService,
              public activatedRoute: ActivatedRoute,
              public qService: QuestionService,
              public router: Router,
              public ansService: AnswerService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // Enum hax
    this.view = ContentView.questions


    this.userMatch = false;

    this.userHandle = this.activatedRoute.snapshot.paramMap.get('handle');

    this.authService.getUserByHandle(this.userHandle).subscribe(data => {
      var res: any = {}
      res = data
      this.currentUser = res.user
      console.log(res)

      this.qService.getUserQuestions(""+this.currentUser._id).subscribe(data => {
        var res: any = {}
        res = data
        console.log(res)
        this.userQuestions = res.questions
        console.log(this.userQuestions)
      })

      this.ansService.getUserAnswers(""+this.currentUser._id).subscribe(data => {
        var res: any = {}
        res = data
        console.log(res)
        this.userAnswers = res.answers
        console.log(this.userAnswers)
      })
    })
    if (this.authService.hasToken()){
      this.authService.getProfile().subscribe(data => {
        var res: any = {}
        res = data
        this.user = res.user
        console.log(this.user)
      }, err => {
        console.log(err)
        return false
      })
    }
  }

  //This is how we will get our enums...kinda hacky
  get contentView() { return ContentView }

  onAnswersClick(){
    console.log("Answers")
    if (this.view != ContentView.answers){
      this.view = ContentView.answers
    }
  }

  onQuestionsClick(){
    console.log("Questions")
    if (this.view != ContentView.questions){
      this.view = ContentView.questions
    }
  }

  // Not to be confused with onQuestionsClick
  onQuestionClicked(text){
    var questionURL = this.qService.questionTextToURL(text)
    console.log(questionURL)
    var routeURL = '/question/' + questionURL
    this.router.navigate([routeURL])
  }

  editBio(){
    
  }
}
