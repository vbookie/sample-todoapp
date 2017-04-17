import { Input } from "@angular/core";

export class Task {   
    _id: string;

    @Input()
    content: string;

    @Input()
    completed: boolean;
}