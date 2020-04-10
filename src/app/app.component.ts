import { Component ,ElementRef, ViewChild} from '@angular/core';
import { UserService, UserDetails, TokenPayload, user_info} from './services/user.service';
import {Router,Event, NavigationStart, NavigationEnd} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MDBBootstrapModule, ModalModule , ModalDirective} from 'angular-bootstrap-md';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  title = 'projectzerow';
  details: UserDetails;

  message = "";

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

  displayName = "";

  login_err = false;

  loadingIn = true;

  isAdmin : boolean;

  @ViewChild('registerModal',{static: true}) registerModal: ModalDirective;
  @ViewChild('loginModal',{static: true}) loginModal: ModalDirective;
  @ViewChild('mgsModal',{static: true}) mgsModal: ModalDirective;
  @ViewChild('mgsLogoutModal',{static: true}) mgsLogoutModal: ModalDirective;
  @ViewChild('mgsERModal',{static: true}) mgsERModal: ModalDirective;
  @ViewChild('registerSuccessModal',{static: true}) registerSuccessModal: ModalDirective;
  @ViewChild('registerFailModal',{static: true}) registerFailModal: ModalDirective;

  constructor(private userService: UserService,private router: Router,private SpinnerService: NgxSpinnerService,private modal: ModalModule) { 

    this.router.events.subscribe((routerEvent: Event)=>{

      if(routerEvent instanceof NavigationStart){
          this.SpinnerService.show(); 
          this.loadingIn = true;
      }

      if(routerEvent instanceof NavigationEnd){
        setTimeout(()=>{
              this.SpinnerService.hide(); 
        },900)
        this.loadingIn = false;
      }

    })

    this.getProfile();

  }

  isExpanded = true;
  state = 'collapsed';
 
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  getProfile(){
    this.userService.profile().subscribe(
      user=>{
        this.details = user;
        this.displayName = user.firstname;
        this.isAdmin = user.is_admin;
        
        if(this.isAdmin==true){
          this.router.navigateByUrl('/admin-home');
        }
        
      },
      err=>{
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    )

}

login(){
    this.userService.login(this.credentials).subscribe(
      res=>{

        console.log("msmamsasm")
        console.log(res)

        if(res.error){

            this.SpinnerService.show(); 
            setTimeout(()=>{
              this.SpinnerService.hide(); 
              this.mgsERModal.show();
            },1000)

            this.credentials.email = "";
            this.credentials.password = "";
        }
        else{

          this.getProfile();
            this.loginModal.hide();

            this.SpinnerService.show(); 

            setTimeout(()=>{
              this.SpinnerService.hide(); 
              this.mgsModal.show();
            },3000)

          
            // this.router.navigateByUrl('/home');
            this.router.navigate(['/home']);

            this.credentials.email = "";
            this.credentials.password = "";
          
        }
        
        
      },
      err=>{
        this.router.navigate(['/home']);
      }

    )
  }

  logout(){
    this.userService.logout();
    this.displayName = ""
    this.mgsLogoutModal.show();
    this.router.navigate(['/home']);
    this.SpinnerService.hide();
    this.isAdmin = false;
  }

  register(){

    this.userService.addUser(this.register_info).subscribe(
      (res)=>{
        // if(ress.error){

        //    this.SpinnerService.show(); 
        //     setTimeout(()=>{
        //       this.SpinnerService.hide(); 
        //       this.registerFailModal.show();
        //     },1000)

        // }
        // else{
        //   console.log(res.status);
        //   this.SpinnerService.show(); 

        //   setTimeout(()=>{
        //         this.SpinnerService.hide(); 
        //         this.registerSuccessModal.show();
        //         this.router.navigate(['/home']);
        //   },2000)
        // }
        // this.router.navigateByUrl('/home');
      },
      err =>{
        console.error(err)
      }
    )

    this.SpinnerService.show(); 

    setTimeout(()=>{
          this.SpinnerService.hide(); 
          this.registerModal.hide();
          this.registerSuccessModal.show();
          this.router.navigate(['/home']);
    },2000)

  }

}



