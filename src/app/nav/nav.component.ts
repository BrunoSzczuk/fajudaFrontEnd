import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle: string = 'FAjuda';
  showMenu: boolean = false;

  constructor(private authService : AuthService) { }

  ngOnInit(){
    this.authService.showMenuEmitter.subscribe(
      show => this.showMenu = show
    );
  }

}
