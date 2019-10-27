import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-formatbar',
  templateUrl: './formatbar.component.html',
  styleUrls: ['./formatbar.component.scss']
})
export class FormatbarComponent implements OnInit {

  alphabetRow1 = 'qwertyuiop';
  alphabetRow2 = 'asdfghjkl;';
  alphabetRow3 = 'zxcvbnm';

  alphabetRows = [this.alphabetRow1, this.alphabetRow2, this.alphabetRow3];

  shiftOn = false;

  @Output()
  letterClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  returnShiftedAlphabetRow(row: number) {
    if (this.shiftOn) {
      return this.alphabetRows[row].toUpperCase().split('');
    } else {
      return this.alphabetRows[row].split('');
    }
  }

  addText(text: string) {
    this.letterClicked.emit('\\(' + text + '\\)');
  }
}
