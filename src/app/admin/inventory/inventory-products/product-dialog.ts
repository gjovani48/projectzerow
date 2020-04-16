import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
  })
  export class ProductDialog{

    name:string;

  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<ProductDialog>,
        @Inject(MAT_DIALOG_DATA) data) {

      this.ngxImgZoom.setZoomBreakPoints([{w: 100, h: 100}, {w: 150, h: 150}, {w: 200, h: 200}, {w: 250, h: 250}, {w: 300, h: 300}]);

        this.previewImageSrc = 'assets/images/'+data.image;
        this.zoomImageSrc = 'assets/images/'+data.image;
        this.name = data.name;
    }

  }