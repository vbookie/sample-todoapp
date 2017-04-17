import { Input } from "@angular/core";

export class Task {   
    id: string;

    @Input()
    content: string;

    @Input()
    completed: boolean;
}