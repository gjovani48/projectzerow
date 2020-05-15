import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UserService, UserDetails} from '../../../services/user.service';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'user-modal.html',
    styleUrls: ['./pos-index.component.scss'],
  })
  export class UserModal{



  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';

  dataYouWantToReturn = "fuck"; //set data.
 //set data.

   public loading = true;

   public users = [];
   public selected_user;

   productsFilter: any = { firstname: '', lastname: ''};

    constructor(
        private dialogRef: MatDialogRef<UserModal>,private userServices:UserService,
        @Inject(MAT_DIALOG_DATA) data) {

      this.getUsers();

    }



  


  getUsers(){
   this.loading = true
   this.users = []

    this.userServices.getUsers().subscribe((res)=>{

      this.users = res;

      this.loading = false;

    })


  }

  selectUser(row){

    this.selected_user = row;

  }

  submit() {
    this.dialogRef.close(this.selected_user);
  }
  

}