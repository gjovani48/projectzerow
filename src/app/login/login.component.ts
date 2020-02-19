import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload, UserDetails} from '../authentication.service';
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

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  login(){
    this.auth.login(this.credentials).subscribe(
      (res)=>{
        console.log(res);
      },
      err =>{
        console.error(err)
      }
    )
  }

}
