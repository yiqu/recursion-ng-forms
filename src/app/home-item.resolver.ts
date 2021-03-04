import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Home } from "./app.component";

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<Home | undefined> {
  constructor(public fs: AngularFirestore) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<Home | undefined> | Promise<Home> | Home {

    const id = route.params.homeId;
    return this.fs.doc<Home>('homes/' + id).snapshotChanges().pipe(
      map((a) => {
        const d = {
          ...a.payload.data(),
          id: a.payload.id
        }
        return d as Home;
      }),
      take(1)
    );
  }
}
