import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService, UserDetails} from '../../services/user.service';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent implements OnInit {

  isAdmin : boolean;

  userDetail: UserDetails;
  newpass = ''; 

  constructor(private userServices: UserService, private router: Router) { }

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

  	this.userDetail.password = (this.newpass=='')? this.userDetail.password: this.newpass;

  	this.userServices.updateUser(this.userDetail).subscribe((res)=>{


  		console.log(res);


  	})


  }

}
