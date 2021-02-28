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

  constructor(public fb: FormBuilder) {}

  createNewHibitantFg() {
    return this.fb.group({
      habitantName: createFormControl(null, false, [Validators.required]),
      age: createFormControl(null, false,  [Validators.required]),
      dependents: this.fb.array([
        new FormGroup({
          source_type: createFormControl(null, false,  [Validators.required])
        })
      ])
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.passedInHabitant?.get('habitantName')) {
      // 2nd level and beyond. A habitant fg exists, passed in from the previous level
      console.log("Got a habitant fg from previous");
      this.habitantFg = this.passedInHabitant;
    } else {
      // 1st habitant formgroup, no habitant fg is passed in.
      console.log("Creating the first habitant fg");
      this.passedInHabitant?.addControl('habitant', this.habitantFg);
    }
  }


  onTypeChange(arryIndex: number) {
    const value = (this.getDependentsArray.at(arryIndex).get('source_type'))?.value;
    const containerFg = (<FormGroup>this.getDependentsArray.at(arryIndex));

    if (value === 'animal') {
      containerFg.addControl('animalName', createFormControl(null, false));
      containerFg.removeControl('habitant');
    }
    else if (value === 'tv') {
      containerFg.removeControl('animalName');
      containerFg.removeControl('habitant');
    }
    /**
     * Create the habitant FG. Add it to the dependent FA, remove other FC (animal name).
     * Set the habitant FG as the FG to pass to next level so this component can use it
     */
    else if (value === 'habitant') {
      containerFg.removeControl('animalName');
      const newHabitant = this.createNewHibitantFg();

      // 1st newly added habitant
      if (this.passedInHabitant?.get('habitant')) {
        console.log("Pass-next from first level");

        ((this.passedInHabitant.get('habitant')?.get('dependents') as FormArray).at(arryIndex) as FormGroup).addControl('habitant', newHabitant);
        this.habitantToPassToNext = ((this.passedInHabitant.get('habitant')?.get('dependents') as FormArray).at(arryIndex) as FormGroup)
          .get('habitant') as FormGroup;
      }
      // 2nd level and +
      else {
        console.log("Pass next 2nd level beyond");

        ((this.passedInHabitant?.get('dependents') as FormArray).at(arryIndex) as FormGroup).addControl('habitant', newHabitant);
        this.habitantToPassToNext = ((this.passedInHabitant?.get('dependents') as FormArray).at(arryIndex) as FormGroup)
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
      return res !== 'source_type';
    });
  }

  // add dependent FG (type -> animal / habitant / tv. FG or FC depending on type)
  onAddDep() {
    this.getDependentsArray.push(new FormGroup({
      source_type: createFormControl(null, false)
    }));
  }

  onRemoveDep(index: number) {
    this.getDependentsArray.removeAt(index);
  }
}
