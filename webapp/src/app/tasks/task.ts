import { Input } from '@angular/core';

export class Task {
    public _id: string;

    @Input()
    public content: string;

    @Input()
    public completed: boolean;
}
