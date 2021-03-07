import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createFormControl, Dependent, Habitant, Home } from '../app.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: 'edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit, OnDestroy {

  currentFg: FormGroup = new FormGroup({});
  currentHome?: Home = undefined;
  onDest$: Subject<void> = new Subject<void>();
  formValid: boolean = false;
  saveClicked: boolean = false;

  constructor(private actRoute: ActivatedRoute, private fb: FormBuilder, public fs: AngularFirestore, private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.actRoute.data.pipe(
      takeUntil(this.onDest$)
    ).
    subscribe((res) => {
      if (res.home.address && res.home.year) {
        this.currentHome = res.home;
        if (this.currentHome) {
          this.createFormGroup(this.currentHome);
        }
      }
    });
  }


  createFormGroup(home: Home) {
    this.currentFg = this.fb.group({
      address: createFormControl(home.address, false, [Validators.required]),
      year: createFormControl(home.year, false, [Validators.required])
    });
    this.addHabitantToFormGroup(home.habitant);
  }

  addHabitantToFormGroup(habitant: Habitant) {
    if (this.currentFg) {
      this.loopHabitant(habitant, this.currentFg);
    }
  }

  loopHabitant(habitant: Habitant, formGroup: FormGroup) {
    let currentHabitant = habitant;
    const habitantKeys = this.objToArray(currentHabitant);
    if (currentHabitant) {
      formGroup.addControl('habitant', new FormGroup({}));  // add habitant FG
      habitantKeys.forEach((key: string) => {               // loop habitant object (age, habitantName, dependents)
        if (key !== 'dependents') {
          (<FormGroup>formGroup.get('habitant')).addControl(key, createFormControl(currentHabitant[key], false, [Validators.required])); // add age, habitantName
        }

        if (key === 'dependents' && currentHabitant.dependents.length > 0) {
          const currentDependents: Dependent[] | undefined = currentHabitant.dependents ? currentHabitant.dependents : [];

          (<FormGroup>formGroup.get('habitant')).addControl('dependents', new FormArray([]));  //add each dependent FG

          currentDependents.forEach((dependent: Dependent, index: number) => {

            (<FormArray>(<FormGroup>formGroup.get('habitant')).get('dependents')).push(new FormGroup({}));

            const dependentKeys = this.objToArray(dependent);     // add dependent_type , habitant, pet, deceased
            dependentKeys.forEach((cKey) => {
              if (cKey !== 'habitant') {       // add non-habitant controls
                (<FormGroup>(<FormArray>(<FormGroup>formGroup.get('habitant')).get('dependents')).at(index))
                  .addControl(cKey, createFormControl(dependent[cKey], false, [Validators.required]));
              }
              if (cKey === 'habitant' && dependent.habitant) { // it's a habitant, put it back into recursive funciton
                this.loopHabitant(dependent.habitant, (<FormGroup>(<FormArray>(<FormGroup>formGroup.get('habitant')).get('dependents')).at(index)));
              }
            });

          });
        }
      })
    }
  }

  onSaveEdit() {
    console.log(this.currentFg.value)
    this.saveClicked = true;
    this.formValid = this.currentFg.valid;
    if (this.currentFg.valid && this.currentHome?.id) {
      const docId: string = this.currentHome?.id;
      this.currentFg.markAsPristine();
      this.fs.doc<Home>('homes/' + docId).update({
        ...this.currentFg.value
      }).then((res) => {
        console.log("done");
        this.router.navigate(['../'], {relativeTo: this.route, queryParams: {edited: docId}});
      })
    }

  }

  ngOnDestroy() {
    this.onDest$.next();
    this.onDest$.complete();
  }

  objToArray(obj: any): string[] {
    return Object.keys(obj);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.currentFg.dirty) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      return of(result);
    }
    return true;
}
}
