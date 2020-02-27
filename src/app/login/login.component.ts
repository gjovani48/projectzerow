import { Component, OnInit } from '@angular/core';
import {UserService, TokenPayload} from '../services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    _id: '',
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    password: ''
  }

  public email;
  public password;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  login(){
    this.userService.login(this.credentials).subscribe(
      (res)=>{
        console.log(res);
        this.router.navigateByUrl('/home');
      },
      err =>{
        console.error(err)
      }
    )
  }

}
