import { user } from './../user.model';
import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user: any;
  constructor(public route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.user = params
      console.log(this.user)
 });
  }

  ngOnInit() {

   }

   ionViewWillEnter() {
    console.log(this.user)
  }

}
