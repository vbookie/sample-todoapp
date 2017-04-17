import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService, Task } from './'

@Component({
    selector: 'task-item',
    templateUrl: 'task-item.component.html'
})

export class TaskItemComponent implements OnInit {
    public isEditing = false;

    @Input()
    public task: Task;

    @Output()
    public deleted = new EventEmitter<Task>();

    private contentBackup: string;

    constructor(private service: TaskService) { }

    ngOnInit() { }

    public onEdit() {
        this.isEditing = true;
        this.contentBackup = this.task.content;
    }

    public onSave() {
        this.service.update(this.task)
            .then(t => 
            {
                this.isEditing = false;
            })
    }

    public onCancel() {
        this.isEditing = false;
        this.task.content = this.contentBackup;
    }

    public onDelete() {
        this.service.delete(this.task)
            .then(() => this.deleted.emit(this.task));    
    }

    public onComplete(event: boolean) {
        this.task.completed = event;
        this.service.update(this.task)
            .then(t => 
            {
                
            })
    }
}