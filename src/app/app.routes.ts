import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        title: 'Products',
        component: ListComponent
      },
      {
        path: 'register',
        title: 'Register Products',
        component: RegisterComponent
      },
    ]
  },
];
