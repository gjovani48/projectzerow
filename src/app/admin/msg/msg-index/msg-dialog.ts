import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';
import {MessegeService} from '../../../services/messege.service'
import {Message} from '../../../models/message';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'msg-dialog',
    templateUrl: 'msg-dialog.html',
    styleUrls: ['./msg-index.component.scss'],
  })
  export class MessageDialog{

    msg:Message;
    message_text = '';

    loading:Boolean;

    reply_active: boolean = false;

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<MessageDialog>,
        private _snackBar: MatSnackBar,
        private messageServices: MessegeService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.msg = data.mgs_data;

    }


    archiveMessage(){

      // if(confirm("Are you sure you want to archive this message?")==true){

      //   this.messageServices.archiveMessage(this.msg).subscribe((res)=>{

      //     this.dialogRef.close('Pizza!');

      //     this. openSnackBar("Message deleted", "Dismis");

      //   })

      // }

      alert("Write permisson is not allowed");

    }

    sendMail(){

      this.loading = true;

      let msg_send = {

        email: this.msg.email,
        message: this.message_text

      }

      this.messageServices.sendMail(msg_send).subscribe((res)=>{

        this.dialogRef.close('Pizza!');

        this.loading = false;
        this. openSnackBar("Message Send", "Dismis");

      })


    }


    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }



  }