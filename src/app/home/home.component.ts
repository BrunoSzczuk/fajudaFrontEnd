import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  title = 'materialApp';
   myControl = new FormControl();
   states;
   local: Object;

   constructor(private data: DataService, private router: Router) {
    this.loadStates();
    }

    ngOnInit() {
      
    }

   loadStates() {
     
    this.data.getLocais().subscribe(content => {
      console.log(content);
      (content as Array<Object>).forEach(r => 
        {
          this.states =  { value: r['cdLocal'], display: r['dsLocal'] };
        })
     });

    //  (this.local as Array<Object>).forEach(element => {
      
    //  });


      // this.states =  allStates.split(/, +/g).map( function (state) {
      //    return {
      //       value: state.toUpperCase(),
      //       display: state
      //    };
      // });
    }

}
