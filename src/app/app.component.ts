import { Component } from '@angular/core';
import { UserService, UserDetails} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  title = 'projectzerow';
  details: UserDetails;

  constructor(private userService: UserService,private router: Router) { }

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



