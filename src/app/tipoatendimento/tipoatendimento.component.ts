import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Router, ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';
import { TipoatendimentoaddComponent } from '../tipoatendimentoadd/tipoatendimentoadd.component';

@Component({
  selector: 'app-tipoatendimento',
  templateUrl: './tipoatendimento.component.html',
  styleUrls: ['./tipoatendimento.component.scss']
})
export class TipoatendimentoComponent implements OnInit {

 
  tipoatendimento = new Object();

  constructor(private data: DataService, 
    private router: Router, 
    public dialog: MatDialog, 
    private route: ActivatedRoute) 
  {
    
  }

  ngOnInit() {
    this.data.getTipoAtendimentos().subscribe(content => {
      this.tipoatendimento = content
    })
  }

  private openDialog() :void {
    const dialogRef = this.dialog.open(TipoatendimentoaddComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../tipoatendimento'], { relativeTo: this.route });
      this.ngOnInit();
    });
  }
  
  private alterarTipoAtendimento():void {
    
  }
}
