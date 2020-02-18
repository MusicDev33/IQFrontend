import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-interactlab',
  templateUrl: './interactlab.component.html',
  styleUrls: ['./interactlab.component.scss']
})
export class InteractLabComponent implements OnInit {

  formData = new FormData();

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  createFileData(files: FileList) {
    const selectedFile = files.item(0);
    this.formData.append('upload', selectedFile, selectedFile.name);
  }

  upload() {
    const headersTemplate = new HttpHeaders();
    const headers = headersTemplate.set('IQ-User-Agent', 'IQAPIv1');
    this.http.post('https://inquantir.com/tsapi/v1/upload/upload', this.formData, {headers})
    .subscribe( result => {
      console.log(result);
    });
  }
}
