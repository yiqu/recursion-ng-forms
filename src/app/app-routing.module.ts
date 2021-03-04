import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditComponent } from './edit/edit.component';
import { HomeResolver } from './home-item.resolver';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "edit", component: EditComponent },
  { path: "edit/:homeId", component: EditItemComponent, resolve: {home: HomeResolver} },
  { path: '**', redirectTo: 'home',pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
