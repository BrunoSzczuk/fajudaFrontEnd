import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocalComponent } from './local/local.component';
import { TipoatendimentoComponent } from "./tipoatendimento/tipoatendimento.component";
import { TipoatendimentoaddComponent } from "./tipoatendimentoadd/tipoatendimentoadd.component";
import { LocaladdComponent } from './localadd/localadd.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, /*canActivate:[AuthGuard]*/ },
  { path: 'local', component: LocalComponent, /*canActivate:[AuthGuard]*/ },
  { path: 'tipoatendimento', component: TipoatendimentoComponent, /*canActivate:[AuthGuard]*/ },
  { path: 'tipoatendimento/add', component: TipoatendimentoaddComponent, /*canActivate:[AuthGuard]*/ },
  { path: 'local/add', component: LocaladdComponent, /*canActivate:[AuthGuard]*/ },
  { path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
