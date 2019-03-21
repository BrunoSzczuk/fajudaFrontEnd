import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocalComponent } from './local/local.component';
import { TipoatendimentoComponent } from "./tipoatendimento/tipoatendimento.component";
import { TipoatendimentoaddComponent } from "./tipoatendimentoadd/tipoatendimentoadd.component";
import { LocaladdComponent } from './localadd/localadd.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'local', component: LocalComponent },
  { path: 'tipoatendimento', component: TipoatendimentoComponent },
  { path: 'tipoatendimento/add', component: TipoatendimentoaddComponent },
  { path: 'local/add', component: LocaladdComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
