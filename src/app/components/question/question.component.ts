import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question: object

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    var questionURL = this.activatedRoute.snapshot.paramMap.get('id');
    var response: any = {}
    this.questionService.getQuestion(questionURL).subscribe(data => {
      response = data;
      console.log(response)
      this.question = response.question
    }, err => {
      console.log(err);
      return false;
    })
  }

  sendAnswer(){

  }

}
