import { Task } from './task';

import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
    private url = 'http://localhost:8000/api/tasks';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    public getTasks(): Promise<Task[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json() as Task[])
            .catch(this.handleError);
    }

    public create(taskContent: string): Promise<Task> {
        let data = {content: taskContent}
        return this.http.post(this.url, JSON.stringify(data), {headers: this.headers})
            .toPromise()
            .then(response => response.json() as Task)
            .catch(this.handleError);
    }

    public update(task: Task): Promise<Task> {
        const url = `${this.url}/${task._id}`;
        return this.http.put(url, JSON.stringify(task), {headers: this.headers})
            .toPromise()
            .then(() => task)
            .catch(this.handleError);
    }

    public delete(task: Task): Promise<void> {
        const url = `${this.url}/${task._id}`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error ocured', error);
        return Promise.reject(error.message || error);
    }
}