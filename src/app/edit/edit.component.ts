import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Home } from '../app.component';

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['./edit.component.scss', '../app.component.css']
})
export class EditComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<Home[]>;

  constructor(public fs: AngularFirestore, private router: Router, private route: ActivatedRoute) {
    this.itemsCollection = fs.collection<any>('homes');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(home => home.map(a => {
        const data = a.payload.doc.data() as Home;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() {
  }

  onGoToEdit(id: string) {
    if (id) {
      this.router.navigate(['./', id], {relativeTo: this.route});
    }
  }
}
