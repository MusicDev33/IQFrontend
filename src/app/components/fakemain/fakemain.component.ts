import { Component, OnInit } from '@angular/core';
import { DebugService } from '../../services/debug.service';
import { IpgenService } from '../../services/ipgen.service';

@Component({
  selector: 'app-fakemain',
  templateUrl: './fakemain.component.html',
  styleUrls: ['./fakemain.component.css']
})
export class FakemainComponent implements OnInit {

  constructor(public debug: DebugService, public ipgen: IpgenService) { }

  ngOnInit() {
    document.body.classList.add('bg-pic');
    /*
    this.ipgen.getIpAddress().subscribe(data => {
      let res: any = {};
      res = data;
      this.ipgen.sendIpAddress(res).subscribe(returnData => {

      });
    });*/
  }

}
