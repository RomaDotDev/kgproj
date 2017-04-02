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
            .map(trackersList => this.normalizeData(trackersList, from, to))
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body.data || { };
    }

    // NOTE: API data doesn't consider timezones
    // NOTE: API data doesn't consider daytime shifts
    private normalizeData(trackersList: Tracker[], from: string, to: string) {
        const result: Tracker[] = [];
        const end: Date = new Date(to);
        let item: Tracker;
        let current: Date = new Date(from);
        console.log(from, current);
        let dateString: string;
        let id: number = 1;

        while (current < end) {
            dateString = this.getIsoDataString(current);
            item = this.getItem(dateString, trackersList);

            if (item !== null) {
                result.push(item);
            } else {
                result.push({
                    id: id,
                    hits: 0,
                    date: dateString
                });
            }

            const newDate = current.setDate(current.getDate() + 1);
            current = new Date(newDate);
            id++;
        }

        return result;
    }

    // helper function to build ISO-8601 string
    private getIsoDataString(date: Date): string {
        const day: string = ('0' + date.getDate()).slice(-2);
        const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
        const year: number = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    // helper function to find tracker obj by date if any
    private getItem(itemDate: string, trackersList: Tracker[]): Tracker {
        let item: Tracker = null;
        for (const tracker of trackersList) {
            if (tracker['date'] === itemDate) {
                item = tracker;
                break;
            }
        }
        return item;
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
