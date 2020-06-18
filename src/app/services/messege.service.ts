import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Message } from '../models/message'
import { HTTPConfig } from '../services/config.service'

@Injectable({
  providedIn: 'root'
})

export class MessegeService {

	constructor(private http: HttpClient) { }

	private url:string = "https://protected-escarpment-77600.herokuapp.com"
    //private url:string = "http://localhost:80"
  	private headers = new HttpHeaders().set('Content-Type', 'application/json')


	// Get All Posts
	getMessages(): Observable<Message[]> {
		return this.http.get<any>(this.url + "/message");
	}

	getArcMessages(): Observable<Message[]> {
		return this.http.get<any>(this.url + "/message/arc");
	}

	// Get Post by ID
	getMessage(id): Observable<Message> {
		return this.http.get<any>(
			this.url + "/message/" + id
		)
	}

	archiveMessage(message): Observable<any> {
		return this.http.post<any>(
			this.url + "/message/archive",
			message,
			{ headers: this.headers }
		)
	}

	unarchiveMessage(message): Observable<any> {
		return this.http.post<any>(
			this.url + "/message/unarchive",
			message,
			{ headers: this.headers }
		)
	}

	openMessage(message): Observable<any> {
		return this.http.post<any>(
			this.url + "/message/open",
			message,
			{ headers: this.headers }
		)
	}

	// Add New Post
	addMessage(message): Observable<any> {
		return this.http.post<any>(
			this.url + "/message",
			message,
			{ headers: this.headers }
		)
	}

	sendMail(message): Observable<any> {
		return this.http.post<any>(
			this.url + "/message/sendemail",
			message,
			{ headers: this.headers }
		)
	}

	// Update Post
	updateMessage(post): Observable<any> {
		return this.http.put<any>(
			this.url + "/message/" + post._id,
			post,
			{ headers: this.headers }
		)
	}

	// Delete Post
	deleteMessage(id): Observable<Message> {
		return this.http.delete<Message>(
			this.url + "/message/" + id
		)
	}
}