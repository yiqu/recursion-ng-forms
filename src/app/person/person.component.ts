import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createFormControl } from '../app.component';

@Component({
  selector: 'app-person',
  templateUrl: 'person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnChanges {

  @Input()
  passedInHabitant: FormGroup | undefined;

  habitantToPassToNext: FormGroup | undefined;

  typeSelections: string[] = ['habitant', 'animal', 'tv'];
  habitantFg: FormGroup = this.createNewHibitantFg();

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.passedInHabitant?.get('habitantName')) {
      console.log("has name")
      this.habitantFg = this.passedInHabitant;
    } else {
      console.log("has NO name")
      this.passedInHabitant?.addControl('habitant', this.habitantFg);
    }
  }

  createNewHibitantFg() {
    return this.fb.group({
      habitantName: createFormControl(null, false, [Validators.required]),
      age: createFormControl(null, false,  [Validators.required]),
      containers: this.fb.array([
        new FormGroup({
          source_type: createFormControl(null, false,  [Validators.required])
        })
      ])
    });

  }

  onAddType() {
    this.getContainers.push(new FormGroup({
      source_type: createFormControl(null, false)
    }));
  }

  onRemoveType(index: number) {
    this.getContainers.removeAt(index);
  }

  onTypeChange(arryIndex: number) {
    const value = (this.getContainers.at(arryIndex).get('source_type'))?.value;
    const containerFg = (<FormGroup>this.getContainers.at(arryIndex));

    console.log(arryIndex, value)

    if (value === 'animal') {
      containerFg.addControl('animalName', createFormControl(null, false));
      containerFg.removeControl('habitant');
    } else if (value === 'tv') {
      containerFg.removeControl('animalName');
      containerFg.removeControl('habitant');
    } else if (value === 'habitant') {

      containerFg.removeControl('animalName');
      const newHabitant = this.createNewHibitantFg();

      // 2nd level and +
      if (this.passedInHabitant?.get('habitant')) {
        ((this.passedInHabitant.get('habitant')?.get('containers') as FormArray).at(arryIndex) as FormGroup).addControl('habitant', newHabitant);
        this.habitantToPassToNext = ((this.passedInHabitant.get('habitant')?.get('containers') as FormArray).at(arryIndex) as FormGroup)
          .get('habitant') as FormGroup;
      }
      else { // the first level, doesnt have a hibitant yet
        ((this.passedInHabitant?.get('containers') as FormArray).at(arryIndex) as FormGroup).addControl('habitant', newHabitant);
        this.habitantToPassToNext = ((this.passedInHabitant?.get('containers') as FormArray).at(arryIndex) as FormGroup)
          .get('habitant') as FormGroup;
      }

    }
  }

  get getContainers(): FormArray {
    return this.habitantFg?.get('containers') as FormArray;
  }


  objToArray(obj: any) {
    const keys = Object.keys(obj);
    return keys.filter((res) => {
      return res !== 'source_type';
    });
  }


}
