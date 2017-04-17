import { Task } from './task';

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
    private url = 'http://localhost:8000/api/tasks';

    constructor(private http: Http) { }

    public getTasks(): Promise<Task[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().data as Task[])
            .catch();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error ocured', error);
        return Promise.reject(error.message || error);
    }
}