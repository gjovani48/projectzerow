import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../../services/user.service';
import { ProductService,} from '../../services/product.service';
import { CategoryService,} from '../../services/category.service';
import { SaleService,} from '../../services/sale.service';
import {Router} from '@angular/router';


export interface montlysale{
  _id: any
  totalAmount: Number
  count: Number
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private userServices: UserService,private router: Router, private productServices: ProductService, 
    private categoryServices:CategoryService, private saleServices: SaleService) { }

  isAdmin : boolean;

  public users = [];
  public categories = [];
  public products = [];
  public sales = [];

  ngOnInit() {
    this.getProfile();
    this.getData();
    this.getMonthlySales();
  }

  getProfile(){
    this.userServices.profile().subscribe(
      user=>{
        this.isAdmin = user.is_admin;
        
        if(this.isAdmin!=true){
          this.router.navigateByUrl('/home');
        }
        
      },
      err=>{
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    )

  }


  getData(){

    this.userServices.getUsers().subscribe((res)=>{
        this.users = res;
    })

    this.productServices.getProducts().subscribe((res)=>{
        this.products = res;
    })

    this.categoryServices.getCategories().subscribe((res)=>{
        this.categories = res;
    })

    this.saleServices.getSales().subscribe((res)=>{
        this.sales = res;
    })

  }

  public chartType: string = 'bar';
  public mSale = [];
  public chartDatasets: Array<any> = [
    { data: this.mSale, label: 'Total Sales' },
  ];

  public temp_chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
  public chartLabels = [];

  getMonthlySales(){
    
    this.saleServices.getMonthlySales().subscribe((res)=>{

      res.sort((a, b) => a._id.month - b._id.month  )

      console.log(res)

      res.forEach((row,i)=>{

          this.mSale.push(row.totalAmount);
          this.chartLabels.push(this.temp_chartLabels[i]);
          // this.chartLabels.push(row._id.month)

      })

      this.chartDatasets = this.mSale;

      // this.chartLabels.sort((a, b) => a - b)

    })

    

  }



  public chartColors: Array<any> = [
    {
      backgroundColor: '#1c2a48',
      borderColor: '#1c2a48',
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void {}





}
