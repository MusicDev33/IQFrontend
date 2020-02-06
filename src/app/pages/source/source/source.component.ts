import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '@services/question.service';
import { SourceService } from '@services/source.service';
import { ISource } from '@interfaces/schemas/ISource';
import { IQuestion } from '@interfaces/schemas/IQuestion';

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

  constructor(
    public activatedRoute: ActivatedRoute,
    public sourceService: SourceService,
    public questionService: QuestionService
  ) { }

  ngOnInit() {
    this.setUpComponent();

    this.activatedRoute.url.subscribe(url => {
       this.setUpComponent();
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
