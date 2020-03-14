import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';
import { CategoryService } from '../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.userService.profile().subscribe(
      user=>{
        this.details = user;

        console.log(this.details);
      },
      err=>{
        console.log(err);
      }
    )


}

}
