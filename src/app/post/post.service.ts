import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Post } from './post.model';

@Injectable()
export class PostService {
    private postsUrl = '//jsonplaceholder.typicode.com/posts';  // URL to web API

    constructor ( private http: Http ) {}

    getAllPosts(): Observable<Post[]> {
        return this.http.get(this.postsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPost(id: number): Observable<Post[]> {
        return this.http.get(`${this.postsUrl}\/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
