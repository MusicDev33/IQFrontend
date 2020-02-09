import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '@services/question.service';
import { SourceService } from '@services/source.service';
import { UserService } from '@services/user.service';
import { ISource } from '@interfaces/schemas/ISource';
import { IQuestion } from '@interfaces/schemas/IQuestion';
import { IUser } from '@interfaces/schemas/IUser';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  questions: IQuestion[];
  sourceURL: string;
  sourceResponse: any;
  sourceResponseSuccess: boolean;

  source: ISource;

  user: IUser;

  constructor(
    public activatedRoute: ActivatedRoute,
    public sourceService: SourceService,
    public questionService: QuestionService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.setUpComponent();

    this.activatedRoute.url.subscribe(url => {
       this.setUpComponent();
    });

    this.userService.getProfile().subscribe((userData: any) => {
      this.user = userData.user;
    });
  }

  setUpComponent() {
    this.sourceURL = this.activatedRoute.snapshot.paramMap.get('source');

    this.sourceService.getSourceByURL(this.sourceURL).subscribe((sourceData: any) => {
      this.sourceResponse = sourceData;
      this.sourceResponseSuccess = sourceData.success;
      console.log(sourceData);

      if (sourceData) {
        this.source = sourceData.source;
      }

      this.sourceService.getQuestionsFromSource(this.source._id).subscribe((questionData: any) => {
        if (questionData) {
          this.questions = questionData.questions;
        }
      });
    });
  }

}
