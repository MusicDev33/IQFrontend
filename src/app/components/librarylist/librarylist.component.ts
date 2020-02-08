import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ISource } from '@interfaces/schemas/ISource';

@Component({
  selector: 'app-librarylist',
  templateUrl: './librarylist.component.html',
  styleUrls: ['./librarylist.component.scss']
})
export class LibraryListComponent implements OnInit {

  @Input() sourceArray: ISource[];

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSourceClicked(sourceName: string) {
    localStorage.setItem('lib-key', sourceName);
    this.router.navigate(['/library']);
  }

}
