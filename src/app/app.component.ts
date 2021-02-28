import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mainFg: FormGroup;

  constructor(public fb: FormBuilder) {
    this.mainFg = new FormGroup({});
  }

  ngOnInit() {
    this.mainFg = this.createMainFormGroup();
    this.mainFg.valueChanges.subscribe((res) => {
      console.log(this.mainFg.value);
    });
    console.log("init")
  }

  //  Overall
  //  Address, Ages, Children (recursive)

  createMainFormGroup() {
    return this.fb.group({
      address: createFormControl('1000 Friendly St.', false, [Validators.required]),
      year: createFormControl('2021', false, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.mainFg.value)
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
