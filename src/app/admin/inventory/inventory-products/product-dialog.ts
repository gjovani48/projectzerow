import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';
import {ProductService} from '../../../services/product.service'
import {Product} from '../../../models/product';

@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'dialog-content-example-dialog.html',
    styleUrls: ['./inventory-products.component.scss'],
  })
  export class ProductDialog{

    product:Product;

    added_stock = 0;


  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<ProductDialog>,
        private productService: ProductService,
        @Inject(MAT_DIALOG_DATA) data) {

      this.ngxImgZoom.setZoomBreakPoints([{w: 100, h: 100}, {w: 150, h: 150}, {w: 200, h: 200}, {w: 250, h: 250}, {w: 300, h: 300}]);

        this.previewImageSrc = 'assets/images/'+data.image;
        this.zoomImageSrc = 'assets/images/'+data.image;
        this.product = data.product_info;
    }



    updateStock(){

      var edited_product = this.product;

      if(confirm('Are you sure you want to add '+this.added_stock+' stock to this item?')){

        edited_product.quantity = parseInt(edited_product.quantity.toString())+this.added_stock;
        

        this.productService.updateProduct(edited_product).subscribe((response)=>{

          this.added_stock = 0;
          
        })

      }

    }


  }