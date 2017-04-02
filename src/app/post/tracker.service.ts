import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Tracker } from './tracker.model';

@Injectable()
export class TrackerService {
    private trackersUrl = '//kargotest.herokuapp.com/api/trackers';

    constructor ( private http: Http ) {}

    getTrackers(from: string, to: string): Observable<Tracker[]> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('from', from);
        params.set('to', to);

        return this.http.get(this.trackersUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body.data || { };
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
