import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createFormControl } from '../app.component';
import { SharedUtilsService } from '../shared/shared.utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mainFg: FormGroup;
  homeCollection: AngularFirestoreCollection<any>;

  constructor(public fb: FormBuilder, ss: SharedUtilsService,
    public fs: AngularFirestore, private router: Router, private route: ActivatedRoute) {
      this.mainFg = new FormGroup({});
      this.homeCollection = fs.collection<any>('homes');
  }

  ngOnInit() {
    this.mainFg = this.createMainFormGroup();
    this.mainFg.valueChanges.pipe(
    )
    .subscribe((res) => {
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

  addItem(item: any) {
    const id = this.fs.createId();
    const doc: any = {...item};
    this.homeCollection.doc(id).set(doc);
    this.router.navigate(['../', 'edit'], {relativeTo: this.route});
  }

  onSubmit() {
    console.log(this.mainFg.value)
    if (this.mainFg.valid) {
      this.addItem(this.mainFg.value);
    }
  }
}
