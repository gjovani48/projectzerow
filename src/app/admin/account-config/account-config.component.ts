import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService, UserDetails} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent implements OnInit {

  isAdmin : boolean;

  userDetail: UserDetails;
  newpass = ''; 

  constructor(private _snackBar: MatSnackBar,private userServices: UserService, private router: Router) { }

  ngOnInit() {

  	this.getProfile();

  }

  getProfile(){
    this.userServices.profile().subscribe(
      user=>{
        this.isAdmin = user.is_admin;

        this.userDetail = user;
        
        if(this.isAdmin!=true){
          this.router.navigateByUrl('/home');
        }
        
      },
      err=>{
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    )

  }

  updateConfig(){

  	if(confirm("Are you sure you want to change your login credentials?")==true){

      this.userDetail.password = (this.newpass=='')? this.userDetail.password: this.newpass;

      this.userServices.updateUser(this.userDetail).subscribe((res)=>{


        this.openSnackBar("Your Login credentials is now updated",'dismis');
        this.getProfile();


      })


    }


  }

   updateUserInfo(){

    if(confirm("Are you sure you want to update your information?")==true){

      this.userDetail.password = (this.newpass=='')? this.userDetail.password: this.newpass;

      this.userServices.updateUserInfo(this.userDetail).subscribe((res)=>{

        this.openSnackBar("Your information is now updated",'dismis');
        this.getProfile();


      })


    }


  }

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
