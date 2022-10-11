import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FileUploadService } from './services/file-upload.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './shared/modal/modal.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { FileSliderComponent } from './file-slider/file-slider.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    FileUploadComponent,
    MainLayoutComponent,
    FileSliderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,

  ],
  providers: [
    FileUploadService,
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
