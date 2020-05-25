import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../models/category'
import { Product } from '../models/product'

@Injectable({
	providedIn: 'root'
})

export class CategoryService {

	constructor(private http: HttpClient) { }

	  private url:string = "https://protected-escarpment-77600.herokuapp.com"
    //private url:string = "http://localhost:80"
  	private headers = new HttpHeaders().set('Content-Type', 'application/json')

	// Get All Categories
	getCategories(): Observable<Category[]> {
		return this.http.get<any>(this.url + "/category");
	}

	getCategoriesArchive(): Observable<Category[]> {
		return this.http.get<any>(this.url + "/category/arc");
	}

	// Get Category by ID
	getCategory(id): Observable<Category> {
		return this.http.get<any>(
			this.url + "/category/" + id
		)
  	}

  getCategoryCount(): Observable<any> {
		return this.http.get<any>(
			this.url + "/product/countitems"
		)
  }

  getProductList(id): Observable<Product[]> {
		return this.http.get<any>(
			this.url + "/category/productlist/" + id
		)
  }

	// Add New Category
	addCategory(category): Observable<any> {
		return this.http.post<any>(
			this.url + "/category",
			category,
			{ headers: this.headers }
		)
	}

	archiveCategory(category): Observable<any> {
		return this.http.post<any>(
			this.url + "/category/archive",
			category,
			{ headers: this.headers }
		)
	}

	// Update Category
	updateCategory(category): Observable<any> {
		return this.http.put<any>(
			this.url + "/category/" + category._id,
			category,
			{ headers: this.headers }
		)
	}

	// Delete Category
	deleteCategory(id): Observable<Category> {
		return this.http.delete<Category>(
			this.url + "/category/" + id
		)
	}
}
