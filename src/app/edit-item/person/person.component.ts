import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createFormControl } from 'src/app/app.component';

const DEPENDENT_SELECTIONS: string[] = ['habitant', 'pet', 'deceased'];

@Component({
  selector: 'app-person-edit',
  templateUrl: 'person.component.html',
  styleUrls: ['./person.component.css']
})
export class EditPersonComponent implements OnInit, OnChanges {

  @Input()
  passedInHabitant: FormGroup | undefined;

  habitantToPassToNext: FormGroup | undefined;

  typeSelections: string[] = [...DEPENDENT_SELECTIONS];
  habitantFg: FormGroup = this.createNewHibitantFg();

  constructor(public fb: FormBuilder) {
  }

  ngOnChanges() {

    if (this.passedInHabitant) {
      console.log("in changes")
      this.habitantFg = this.passedInHabitant;
      const containerArray = <FormArray>this.habitantFg.get('dependents');

      if (containerArray) {
        containerArray.controls.forEach((containerCtrl, index: number) => {
          this.onTypeChange(index);
        });
      } else {
        this.habitantFg.addControl('dependents', this.fb.array([
          new FormGroup({
            dependent_type: createFormControl(null, false,  [Validators.required])
          })
        ]));
      }
    }
  }

  ngOnInit() {
  }

  createNewHibitantFg() {
    return this.fb.group({
      habitantName: createFormControl(null, false, [Validators.required]),
      age: createFormControl(null, false,  [Validators.required]),
      dependents: this.fb.array([
        new FormGroup({
          dependent_type: createFormControl(null, false,  [Validators.required])
        })
      ])
    });
  }

  onTypeChange(arryIndex: number) {
    const value = (this.getDependentsArray.at(arryIndex).get('dependent_type'))?.value;
    const containerFg = (<FormGroup>this.getDependentsArray.at(arryIndex));

    if (value === 'pet') {
      containerFg.addControl('petName', createFormControl(null, false, [Validators.required]));
      containerFg.removeControl('habitant');
    }
    else if (value === 'deceased') {
      containerFg.removeControl('petName');
      containerFg.removeControl('habitant');
    }

    /**
     * Create the habitant FG. Add it to the dependent FA, remove other FC (animal name).
     * Set the habitant FG as the FG to pass to next level so this component can use it
     */
    else if (value === 'habitant') {
      containerFg.removeControl('petName');
      const newHabitant = this.createNewHibitantFg();

      // 1st newly added habitant
      if (this.passedInHabitant?.get('habitant')) {
        console.log("Pass-next from first level");

        ((this.passedInHabitant.get('habitant')?.get('dependents') as FormArray).at(arryIndex) as FormGroup)
          .addControl('habitant', newHabitant);

        this.habitantToPassToNext =
          ((this.passedInHabitant.get('habitant')?.get('dependents') as FormArray).at(arryIndex) as FormGroup)
            .get('habitant') as FormGroup;
      }
      // 2nd level and +
      else {
        console.log("Pass next 2nd level beyond");

        ((this.passedInHabitant?.get('dependents') as FormArray).at(arryIndex) as FormGroup)
          .addControl('habitant', newHabitant);

        this.habitantToPassToNext =
          ((this.passedInHabitant?.get('dependents') as FormArray).at(arryIndex) as FormGroup)
            .get('habitant') as FormGroup;
      }
    }
  }

  get getDependentsArray(): FormArray {
    return this.habitantFg?.get('dependents') as FormArray;
  }

  objToArray(obj: any) {
    const keys = Object.keys(obj);
    return keys.filter((res) => {
      return res !== 'dependent_type';
    });
  }

  // add dependent FG
  onAddDep() {
    this.getDependentsArray.push(new FormGroup({
      dependent_type: createFormControl(null, false)
    }));
  }

  onRemoveDep(index: number) {
    this.getDependentsArray.removeAt(index);
  }
}
