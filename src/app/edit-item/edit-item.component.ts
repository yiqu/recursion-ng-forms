import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: 'edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.actRoute.data.subscribe((res) => {
      console.log(res.home)
    })
  }
}
