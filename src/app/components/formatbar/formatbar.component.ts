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

  // Greek Alphabet
  gAlphabetRow1 = '\\epsilon,\\rho,\\tau,\\upsilon,\\theta,\\iota,\\omicron,\\pi';
  gAlphabetRow2 = '\\alpha,\\sigma,\\delta,\\phi,\\gamma,\\eta,\\xi,\\kappa,\\lambda';
  gAlphabetRow3 = '\\zeta,\\chi,\\psi,\\omega,\\beta,\\nu,\\mu';

  gAlphabetRows = [this.gAlphabetRow1, this.gAlphabetRow2, this.gAlphabetRow3];

  gUpperAlphabetRow1 = 'E,P,T,\\Upsilon,\\Theta,I,O,\\Pi';
  gUpperAlphabetRow2 = 'A,\\Sigma,\\Delta,\\Phi,\\Gamma,H,Xi,K,\\Lambda';
  gUpperAlphabetRow3 = 'Z,X,\\Psi,\\Omega,B,N,M';

  gUpperAlphabetRows = [this.gUpperAlphabetRow1, this.gUpperAlphabetRow2, this.gUpperAlphabetRow3];

  shiftOn = false;

  keyboardMode = 'Alphabet';
  alphabetMode = 'English';

  @Output()
  letterClicked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  backspaceClicked: EventEmitter<any> = new EventEmitter<any>();

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

  returnShiftedGAlphabetRow(row: number) {
    if (this.shiftOn) {
      return this.gUpperAlphabetRows[row].split(',');
    } else {
      return this.gAlphabetRows[row].split(',');
    }
  }

  addText(text: string) {
    this.letterClicked.emit('\\(' + text + '\\)');
  }

  backspace() {
    this.backspaceClicked.emit(true);
  }

  shiftKeyPressed() {
    this.shiftOn = !this.shiftOn;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  keyboardModeChange(mode: string) {
    this.keyboardMode = mode;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

  changeAlphabetMode(text: string) {
    this.alphabetMode = text;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }
}
