import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SharedUtilsService } from './shared/shared.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mainFg: FormGroup;

  constructor(public fb: FormBuilder, ss: SharedUtilsService) {
    this.mainFg = new FormGroup({});
  }

  ngOnInit() {
    this.mainFg = this.createMainFormGroup();
    this.mainFg.valueChanges.pipe(
      debounceTime(1500)
    )
    .subscribe((res) => {
      console.log(this.mainFg.value);
    });
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
