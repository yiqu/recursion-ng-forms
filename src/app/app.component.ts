import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SharedUtilsService } from './shared/shared.utils';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }
}

export function createFormControl(value: any, disabled: boolean,
  validators: any[] = [], asyncValids: any[] = []): FormControl {
  let fc = new FormControl({
    value: value,
    disabled: disabled
  }, validators, asyncValids);
  return fc;
}

export interface Home {
  id?: string;
  address: string;
  year: string;
  habitant: Habitant;
}

export interface Habitant {
  habitantName: string;
  age: string;
  dependents: Dependent[];
}

export interface Dependent extends IObjectStringKey {
  dependent_type: string;
  habitant? : Habitant;
}

export interface IObjectStringKey {
  [key: string]: any;
}
