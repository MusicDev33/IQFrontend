import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { DebugService } from '../../services/debug.service';
import { SourceService } from '../../services/source.service';
import { SearchService } from '../../services/search.service';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  user: any;

  findSourceMode = false;
  findSourceText = '';
  sourceSearchResults = [];

  constructor(
    public authService: AuthService,
    public debug: DebugService,
    public sourceService: SourceService,
    public search: SearchService) { }

  ngOnInit() {
    this.authService.loadUser();
    this.user = this.authService.getUser();
    console.log(this.user);
  }

  findSource() {
    this.findSourceMode = true;
    this.debug.log(this.findSourceMode);
  }

  findSourceKeyUp() {
    const minLength = 1;
    if (this.findSourceText.length > minLength && this.sourceSearchResults.length === 0) {
      this.search.sourceSearch(this.findSourceText).subscribe(data => {
        const res: any = data;
        this.sourceSearchResults = res.sources;
      });
    } else if (this.findSourceText.length <= minLength) {
      this.sourceSearchResults = [];
    }
  }

  sourceSelected(source: string) {
    this.debug.log(source);
  }
}
