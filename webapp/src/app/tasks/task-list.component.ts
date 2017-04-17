import { TaskItemComponent } from './task-item.component';
import { Task } from "./task";
import { TaskService } from './task.service';
import { Component, OnInit } from '@angular/core';

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

    public onCreated(task: Task): void {
        this.tasks.push(task);
    }

    public onDeleted(task: Task): void {
        let index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }
}