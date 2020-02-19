import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Redeemable } from '../models/redeemable'
import { HTTPConfig } from '../services/config.service'

@Injectable({
	providedIn: 'root'
})

export class RedeemableService {

	constructor(private http: HttpClient, private httpconfig: HTTPConfig) { }

	private url = this.httpconfig.getURL()
  	private headers = this.httpconfig.getHeaders()


	// Get All Redeemables
	getRedeemables(): Observable<Redeemable[]> {
		return this.http.get<any>(this.url + "/redeemable");
	}

	// Get Redeemable by ID
	getRedeemable(id): Observable<Redeemable> {
		return this.http.get<any>(
			this.url + "/redeemable/" + id
		)
	}

	// Add New Redeemable
	addRedeemable(redeem): Observable<any> {
		return this.http.post<any>(
			this.url + "/redeemable",
			redeem,
			{ headers: this.headers }
		)
	}

	// Update Redeemable
	updateRedeemable(redeem): Observable<any> {
		return this.http.put<any>(
			this.url + "/redeemable/" + redeem._id,
			redeem,
			{ headers: this.headers }
		)
	}

	// Delete Redeemable
	deleteRedeemable(id): Observable<Redeemable> {
		return this.http.delete<Redeemable>(
			this.url + "/redeemable/" + id
		)
	}
}