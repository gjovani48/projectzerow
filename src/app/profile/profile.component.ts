import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';
import { CategoryService } from '../services/category.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;

  constructor(private userService: UserService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
  this.SpinnerService.show(); 
    this.userService.profile().subscribe(
      user=>{
        this.details = user;
        this.SpinnerService.hide(); 
      },
      err=>{
        console.log(err);
      }
    )


}

}
