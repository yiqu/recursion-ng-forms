import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonComponent } from './person/person.component';
import { CommonModule } from '@angular/common';
import { AnimalPipeDisplay } from './pipes.pipe';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditPersonComponent } from './edit-item/person/person.component';
import { CanDeactivateGuard } from './can-deactivate.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    AnimalPipeDisplay,
    EditComponent,
    HomeComponent,
    EditItemComponent,
    EditPersonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
