import { Component } from '@angular/core';
import { UserService, UserDetails, TokenPayload, user_info} from './services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  title = 'projectzerow';
  details: UserDetails;

  credentials: TokenPayload = {
    _id: '',
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    password: ''
  }

  register_info: user_info = {
    firstname: '',
    lastname: '',
    middlename: '',
    phone: '',
    email: '',
    password: ''
  }

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.getProfile()
  }

  getProfile(){
    this.userService.profile().subscribe(
      user=>{
        this.details = user;

        console.log(this.details);
      },
      err=>{
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    )


}

login(){
    this.userService.login(this.credentials).subscribe(
      (res)=>{
        console.log(res);
        // this.router.navigateByUrl('/home');
        location.href ="/home";
      },
      err =>{
        console.error(err)
      }
    )
  }

  register(){

    this.userService.addUser(this.register_info).subscribe(
      (res)=>{
        console.log(res.status);
        alert(res.status)
        // this.router.navigateByUrl('/home');
      },
      err =>{
        console.error(err)
      }
    )

  }

}



