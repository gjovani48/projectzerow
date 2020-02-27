import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  details: UserDetails;

  constructor(private userService: UserService, private router: Router) { }

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
          this.router.navigateByUrl('/login');
        }
      )


  }

}
