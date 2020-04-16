import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';
import {Product} from '../../../models/product';

import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import {  FileUploader } from 'ng2-file-upload';

//const uploadAPI = 'http://localhost:80/product/upload'; // better use a service class

const uploadAPI = 'https://protected-escarpment-77600.herokuapp.com/product/upload';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });

  constructor(private userService: UserService,
              private router: Router,
              private productService: ProductService, 
              private categoryService: CategoryService,private _snackBar: MatSnackBar){ }

  productForm = new FormGroup({
    name : new FormControl(),
    description : new FormControl(),
    price : new FormControl(),
    image : new FormControl(),
    category_id : new FormControl(),
  });

  categoryList = [];
  product: Product[];

  img:string;

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          console.log('FileUpload:uploaded successfully:', item, status, response);
          let file_name = JSON.parse(response);

         this.productForm.patchValue({
          image: file_name.success.toString(),
        });

        // this.img = file_name.success.toString();

        // console.log(this.img.toString());
    };
    this.getCategories();
  }

  name = 'Angular 4';
  url;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
      }
    }
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      resonse=>{
        this.categoryList = resonse;
      },
      err=>{
        console.log(err);
      }
    )
  }

  addProduct(){
    this.uploader.uploadAll();
    this.productService.addProduct(this.productForm.value).subscribe((response)=>{
      console.log(this.productForm.value)
      this.openSnackBar(response.msg,'dismis');
      console.log(this.productForm.value)
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
