import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Sale } from '../models/sale'
import { HTTPConfig } from '../services/config.service'

@Injectable({
	providedIn: 'root'
})

export class SaleService {

	constructor(private http: HttpClient, private httpconfig: HTTPConfig) { }

	private url = this.httpconfig.getURL()
  	private headers = this.httpconfig.getHeaders()

	// Get All Sales
	getSales(): Observable<Sale[]> {
		return this.http.get<any>(this.url + "/sale");
	}

	// Get Sale by ID
	getSale(id): Observable<Sale> {
		return this.http.get<any>(
			this.url + "/sale/" + id
		)
	}

	// Add new Sale
	addSale(sale): Observable<any> {
		return this.http.post<any>(
			this.url + "/sale",
			sale,
			{ headers: this.headers }
		)
	}

	// Update Sale
	updateSale(sale): Observable<any> {
		return this.http.put<any>(
			this.url + "/sale/" + sale._id,
			sale,
			{ headers: this.headers }
		)
	}

	// Delete Sale
	deleteSale(id): Observable<Sale> {
		return this.http.delete<Sale>(
			this.url + "/sale/" + id
		)
	}
}