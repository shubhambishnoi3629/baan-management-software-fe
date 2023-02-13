import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { BhaaiComponent } from 'src/components/bhaai/bhaai.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EditBhaaiComponent } from 'src/components/bhaai/edit/edit-bhaai.component';
import { EditBaanComponent } from 'src/components/baan/edit/edit-baan.component';
import { BaanComponent } from 'src/components/baan/baan.component';
import { SearchBaanComponent } from 'src/components/bhaai/searchresult/search-baan.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BhaaiComponent,
    EditBhaaiComponent,
    BaanComponent,
    EditBaanComponent,
    SearchBaanComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
