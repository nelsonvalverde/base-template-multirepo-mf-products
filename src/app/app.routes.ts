import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
