import { HttpHeaders } from '@angular/common/http'

export class HTTPConfig {

    getURL() {
        const url = "http://localhost:80"
        return url
    }

    getHeaders() {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        return headers
    }

}
