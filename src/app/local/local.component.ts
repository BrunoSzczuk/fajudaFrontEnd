import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})

export class LocalComponent implements OnInit {

  local: Object;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.data.getLocais().subscribe(content => {
      this.local = content
    })
  }

  goToAddLocal() {
    this.router.navigate(['/local/add']); 
  }

}
