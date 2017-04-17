import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService, Task } from './';

@Component({
    selector: 'task-item',
    templateUrl: 'task-item.component.html',
    styleUrls: ['task-item.component.css']
})
export class TaskItemComponent {
    public isEditing = false;

    @Input()
    public task: Task;

    @Output()
    public deleted = new EventEmitter<Task>();

    private contentBackup: string;

    constructor(private service: TaskService) { }

    public onEdit() {
        this.isEditing = true;
        this.contentBackup = this.task.content;
    }

    public onSave() {
        this.service.update(this.task)
            .then((task) => this.isEditing = false)
            .catch(() => this.task.content = this.contentBackup);
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
        let isCompleted = this.task.completed;
        this.task.completed = event;
        this.service.update(this.task)
            .catch(() => this.task.completed = isCompleted);
    }
}
