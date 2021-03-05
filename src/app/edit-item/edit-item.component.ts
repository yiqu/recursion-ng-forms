import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createFormControl, Home } from '../app.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: 'edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit, OnDestroy {

  currentFg: FormGroup = new FormGroup({});
  currentHome?: Home = undefined;
  onDest$: Subject<void> = new Subject<void>();

  constructor(private actRoute: ActivatedRoute, private fb: FormBuilder) {

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
    console.log(this.currentFg)
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
