import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user'
import { HTTPConfig } from '../services/config.service'

@Injectable({
	providedIn: 'root'
})

export class UserService {

	constructor(private http: HttpClient, private httpconfig: HTTPConfig) { }

	private url = this.httpconfig.getURL()
  	private headers = this.httpconfig.getHeaders()

	// Get All Users
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.url + "/user");
	}

	// Get User by ID
	getUser(id): Observable<User> {
		return this.http.get<User>(
			this.url + "/user/" + id
		)
	}

	// Get User by Fingerprint
	getUserFingerprint(id): Observable<User> {
		return this.http.get<User>(
			this.url + "/user/fingerprint/" + id
		)
	}

	// Add New User
	addUser(user): Observable<any> {
		return this.http.post<any>(
			this.url + "/user",
			user,
			{ headers: this.headers }
		)
	}

	// Add Fingerprint ID
	addFingerprint(user): Observable<any> {
		return this.http.put<any>(
			this.url + '/user/' + user._id + '/fingerprintid',
			user,
			{ headers: this.headers }
		)
	}

	// Add PZW Points
	addPZWPoints(user): Observable<any> {
		return this.http.put<any>(
			this.url + '/user/' + user._id + '/pzwpoints',
			user,
			{ headers: this.headers }
		)
	}

	// Update User
	updateUser(user): Observable<any> {
		return this.http.put<any>(
			this.url + "/user/" + user._id,
			user,
			{ headers: this.headers }
		)
	}


	// Delete User
	deleteUser(id): Observable<User> {
		return this.http.delete<User>(
			this.url + "/user/" + id
		)
	}
}