import { Routes } from '@angular/router';
import { AccessComponent } from './access/access';
import { LoginComponent } from './login/login';
import { ErrorComponent } from './error/error';

export default [
    { path: 'access', component: AccessComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'login', component: LoginComponent }
] as Routes;
