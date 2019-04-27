import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material';
import { LocaladdComponent } from '../localadd/localadd.component';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})

export class LocalComponent implements OnInit {

  locais = new Object();

  constructor(private data: DataService, 
    private router: Router, 
    public dialog: MatDialog, 
    private route: ActivatedRoute) 
  {
    
  }

  ngOnInit() {
    this.data.getLocais().subscribe(content => {
      this.locais = content
    })
  }

  delete(id) {
    this.data.deleteLocal(id);
  }
  private openDialog() :void {
    const dialogRef = this.dialog.open(LocaladdComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../local'], { relativeTo: this.route });
      this.ngOnInit();
    });
  }

}
