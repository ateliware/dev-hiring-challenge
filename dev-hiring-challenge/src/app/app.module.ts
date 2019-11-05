import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GithubService} from './apis/github.service';
import { RepoComponent } from './repo/repo.component';
import {HerokuService} from './apis/heroku.service';

@NgModule({
  declarations: [
    AppComponent,
    RepoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GithubService,
    HerokuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
