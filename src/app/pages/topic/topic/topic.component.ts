import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '@services/question.service';
import { SubjectsService } from '@services/subjects.service';
import { UserService } from '@services/user.service';
import { ISubject } from '@interfaces/schemas/ISubject';
import { IUser } from '@interfaces/schemas/IUser';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  questions: any[];
  topicName: string;
  topicResponse: any;
  topicResponseSuccess: boolean;

  subject: ISubject;
  user: IUser;
  userSubjects: string[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public questionService: QuestionService,
    public subjectService: SubjectsService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.setUpComponent();

    this.activatedRoute.url.subscribe(url => {
       this.setUpComponent();
    });
  }

  followButtonClicked() {
    this.userSubjects.push(this.subject.name);
    this.userService.changeUserProperty('currentSubjects', this.userSubjects).subscribe((result: any) => {

    });
  }

  setUpComponent() {
    this.topicName = this.activatedRoute.snapshot.paramMap.get('topic');

    this.subjectService.getSubjectByURL(this.topicName).subscribe((subjectData: any) => {
      this.topicResponse = subjectData;
      this.topicResponseSuccess = subjectData.success;
      console.log(subjectData);

      if (subjectData) {
        this.subject = subjectData.subject;
      }

      this.questionService.getSubjectQuestions(this.topicName).subscribe((questionData: any) => {
        if (questionData) {
          this.questions = questionData.questions;
        }
      });
    });

    this.userService.getProfile().subscribe((userData: any) => {
      this.user = userData.user;
      this.userSubjects = this.user.currentSubjects;
    }, err => {
      return false;
    });
  }
}
