import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LocalComponent } from './local/local.component';
import { TipoAtendimentoComponent } from './tipoatendimento/tipoatendimento.component';
import { TipoAtendimentoaddComponent } from './tipoatendimentoadd/tipoatendimentoadd.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { LocaladdComponent } from './localadd/localadd.component';
import { MatAutocompleteModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MAT_DIALOG_DATA, MatSnackBarModule, MatChipList, MatChip, MatChipsModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CdkTableModule } from '@angular/cdk/table';
import { HomeAtendimentoComponent } from './homeatendimento/homeatendimento.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    LocalComponent,
    TipoAtendimentoComponent,
    TipoAtendimentoaddComponent,
    LocaladdComponent,
    LoginComponent,
    HomeAtendimentoComponent
  ],
  imports: [
    BrowserModule,
    CdkTableModule,
    MatTableModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatChipsModule,
    MaterialModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
   // ConfirmdialogComponent,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [AuthService, AuthGuard,  { provide: MAT_DIALOG_DATA, useValue: [] }],
  bootstrap: [AppComponent],
 // entryComponents: [ ConfirmdialogComponent ]
})
export class AppModule { }
