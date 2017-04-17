import { Routes } from '@angular/router';

import { DataResolver } from './app.resolver';

import { TaskListComponent } from './tasks';
import { NoContentComponent } from "./no-content";

export const ROUTES: Routes = [
  { path: '',      component: TaskListComponent },
  { path: 'tasks',  component: TaskListComponent },
  { path: '**',    component: NoContentComponent },
];
