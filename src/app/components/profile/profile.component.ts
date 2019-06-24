import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { QuestionService } from '../../services/question.service'
import { ActivatedRoute } from '@angular/router';


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
              public qService: QuestionService) { }

  ngOnInit() {
    // Enum hax
    this.view = ContentView.questions


    this.userMatch = false;

    this.userHandle = this.activatedRoute.snapshot.paramMap.get('handle');
    this.authService.loadUser();

    this.authService.getUserByHandle(this.userHandle).subscribe(data => {
      var res: any = {}
      res = data
      this.currentUser = res.user
      console.log(res)
    })

    this.authService.getProfile().subscribe(data => {
      var res: any = {}
      res = data
      this.user = res.user
      console.log(this.user)
    }, err => {
      console.log(err)
      return false
    })

    this.qService.getUserQuestions(this.authService.userMongoID()).subscribe(data => {
      var res: any = {}
      res = data
      console.log(res)
    })
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
}
