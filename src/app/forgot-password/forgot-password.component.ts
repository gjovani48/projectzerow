import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public email = "";
  public alert;

  sendRecoveryLink(){

  	let data = {
  		email: this.email
  	}

  	this.userService.forgotPassword(data).subscribe((res)=>{

  		this.alert = res;

  	})


  }

}
