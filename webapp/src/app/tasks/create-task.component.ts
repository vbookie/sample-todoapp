import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService, Task } from './';

@Component({
    selector: 'create-task',
    templateUrl: 'create-task.component.html'
})
export class CreateTaskComponent {
    public isCreating = false;

    @Input()
    public content: string;

    @Output()
    public created = new EventEmitter<Task>();

    constructor(private service: TaskService) { }

    public onCreate() {
        this.isCreating = true;
        this.content = '';
    }

    public onSave() {
        this.service.create(this.content)
            .then((task) => {
                this.created.emit(task);
                this.isCreating = false;
            });
    }

    public onCancel() {
        this.isCreating = false;
    }
}
