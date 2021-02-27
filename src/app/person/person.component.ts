import { Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { createFormControl } from '../app.component';

@Component({
  selector: 'app-person',
  templateUrl: 'person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnChanges {

  typeSelections: string[] = ['Person', 'Animal', 'TV'];
  habitantFg: FormGroup | undefined = this.createNewPersonFg();;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    //this.habitantFg = this.createNewPersonFg();
  }

  createNewPersonFg() {
    return this.fb.group({
      name: createFormControl(null, false),
      age: createFormControl(null, false),
      containers: this.fb.array([
        new FormGroup({
          source_type: createFormControl(null, false)
        })
      ])
    });

  }

  onAddType() {
    this.getContainers.push(new FormGroup({
      source_type: createFormControl(null, false)
    }));
  }

  onTypeChange(arryIndex: number) {
    const value = (this.getContainers.at(arryIndex).get('source_type'))?.value
    console.log(arryIndex, value)

    if (value === 'Animal') {
      (<FormGroup>this.getContainers.at(arryIndex)).addControl(
        'petName', createFormControl(null, false)
      );
    } else if (value === 'TV') {
      (<FormGroup>this.getContainers.at(arryIndex)).removeControl('petName');
    } else if (value === 'Person') {
      (<FormGroup>this.getContainers.at(arryIndex)).removeControl('petName');



    }
    //(<FormGroup>this.getContainers.at(arryIndex)).addControl()
  }

  get getContainers(): any {
    return this.habitantFg?.get('containers') as FormArray;
  }


  objToArray(obj: any) {
    const keys = Object.keys(obj);
    return keys.filter((res) => {
      return res !== 'source_type';
    });
  }


}
