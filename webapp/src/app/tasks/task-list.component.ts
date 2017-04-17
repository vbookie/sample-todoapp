import { Task } from "./task";
import { TaskService } from './task.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'task-list',
    templateUrl: 'task-list.component.html'
})
export class TaskListComponent implements OnInit {
    public tasks: Task[];

    constructor(private service: TaskService) { }

    ngOnInit() {
        this.service.getTasks()
            .then(tasks => this.tasks = tasks);
    }

    public onEdit(task: Task) {
        
    }

    public onDelete(id: string) {
        
    }

    public onComplete(event: any) {

    }
}