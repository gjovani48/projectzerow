import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Post } from '../models/post'
import { HTTPConfig } from '../services/config.service'


@Injectable({
	providedIn: 'root'
})

export class PostService {

	constructor(private http: HttpClient, private httpconfig: HTTPConfig) { }

	private url:string = "https://protected-escarpment-77600.herokuapp.com"
    //private url:string = "http://localhost:80"
  	private headers = new HttpHeaders().set('Content-Type', 'application/json')


	// Get All Posts
	getPosts(): Observable<Post[]> {
		return this.http.get<any>(this.url + "/post");
	}

	// Get Post by ID
	getPost(id): Observable<Post> {
		return this.http.get<any>(
			this.url + "/post/" + id
		)
	}

	// Add New Post
	addPost(post): Observable<any> {
		return this.http.post<any>(
			this.url + "/post",
			post,
			{ headers: this.headers }
		)
	}

	// Update Post
	updatePost(post): Observable<any> {
		return this.http.put<any>(
			this.url + "/post/" + post._id,
			post,
			{ headers: this.headers }
		)
	}

	// Delete Post
	deletePost(id): Observable<Post> {
		return this.http.delete<Post>(
			this.url + "/post/" + id
		)
	}
}