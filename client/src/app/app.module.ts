import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";
import 'hammerjs';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatCardModule,
  MatRippleModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatTabsModule,
  GestureConfig,
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RepositoryTableComponent} from './components/repository-table/repository-table.component';
import {AppService} from './services/app.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {RepositorySaveTableComponent} from "./components/repository-save-table/repository-table.component";


@NgModule({
  declarations: [
    AppComponent,
    RepositoryTableComponent,
    RepositorySaveTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    CdkTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    AppService,
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
