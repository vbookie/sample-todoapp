import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService, Task } from './';

@Component({
    selector: 'create-task',
    templateUrl: 'create-task.component.html'
})

export class CreateTaskComponent implements OnInit {
    public isCreating = false;
    
    @Input()
    public content: string;

    @Output()
    public created = new EventEmitter<Task>();

    constructor(private service: TaskService) { }

    ngOnInit() { }

    public onCreate() {
        this.isCreating = true;
        this.content = '';
    }

    public onSave() {
        this.isCreating = false;
        
        this.service.create(this.content)
            .then(task => this.created.emit(task));
    }

    public onCancel() {
        this.isCreating = false;
    }
}