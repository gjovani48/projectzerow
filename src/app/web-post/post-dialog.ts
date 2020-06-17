import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';


@Component({
    selector: 'post-dialog',
    templateUrl: 'post-dialog.html',
    styleUrls: ['./web-post.component.scss'],
  })
  export class PostDialog{

    post;

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<PostDialog>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.post = data.post_data;
    }



  }