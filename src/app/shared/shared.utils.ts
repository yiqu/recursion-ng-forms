import * as hash from 'object-hash';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedUtilsService {

  test: any = {
    name: "John.",
    address: {
      city: "LA",
      state: "CA",
      code: {
        code: 123
      }
    }
  }

  test1: any = {
    name: "John.",
    address: {
      city: "LA",
      state: "CA",
      code: {
        code: 1231
      }
    }
  }

  test3 = [
    this.test,
    this.test,
    this.test,
    this.test,
    this.test,
    this.test
  ];

  test4 = [
    this.test,
    this.test,
    this.test,
    this.test,
    this.test,
    this.test
  ]

  constructor() {
    let a = (hash(this.test3));
    let b = (hash(this.test4));

    //console.log("equal? ", a === b);
  }

}
