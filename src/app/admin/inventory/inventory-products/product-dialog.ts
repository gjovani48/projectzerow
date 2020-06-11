import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';
import {ProductService} from '../../../services/product.service'
import {Product} from '../../../models/product';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
    styleUrls: ['./inventory-products.component.scss'],
  })
  export class ProductDialog{

    product:Product;

    added_stock = 0;

    checkboxFlag:Boolean;

    loading:Boolean = false;


  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<ProductDialog>,
        private productService: ProductService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data) {

      this.ngxImgZoom.setZoomBreakPoints([{w: 100, h: 100}, {w: 150, h: 150}, {w: 200, h: 200}, {w: 250, h: 250}, {w: 300, h: 300}]);

        this.previewImageSrc = 'assets/images/'+data.image;
        this.zoomImageSrc = 'assets/images/'+data.image;
        this.product = data.product_info;
    }



    updateStock(){

      this.loading = true;

      var edited_product = this.product;

      if(confirm('Are you sure you want to add '+this.added_stock+' stock to this item?')){

        edited_product.quantity = parseInt(edited_product.quantity.toString())+this.added_stock;
        

        this.productService.updateProduct(edited_product).subscribe((response)=>{

          this.added_stock = 0;

          this.loading = false;

          this.openSnackBar('product succesfully updated','dismiss');
          
        })

      }

    }

    updateProduct(){

      this.loading = true;

      var edited_product = this.product;

      if(confirm('Are you sure you want to update the product information?')){

        this.productService.updateProduct(edited_product).subscribe((response)=>{

          this.loading = false;

          this.openSnackBar('product succesfully updated','dismiss');
          
        })

      }

    }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }



  }