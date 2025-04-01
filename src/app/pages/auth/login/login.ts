import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { FormValidator } from '@global/helper';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../service/authendication.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, ReactiveFormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    templateUrl: './login.html',
    changeDetection:ChangeDetectionStrategy.OnPush,
    providers: [AuthenticationService]
})
export class LoginComponent implements AfterViewInit, OnDestroy {



    objDestroy$ = new Subject();

    loginForm: FormGroup;

    objFormValidator:FormValidator

    objFormMessages:{[x:string]:string}={};

    constructor(private fb: FormBuilder,private cdr:ChangeDetectorRef,private AuthService:AuthenticationService) {
        this.loginForm = this.fb.group({
            email: ["", [Validators.required,Validators.email]],
            password: ["", [Validators.required]],
        })
        this.objFormValidator = new FormValidator({
            email: {
                required: "Email is required",
                email: "Enter an valid email id"
            },
            password: {
                required: "Password is required"
            },
        })
    }
    ngOnDestroy(): void {
        this.objDestroy$.next(null);
        this.objDestroy$.complete();
    }
    ngAfterViewInit(): void {
        this.loginForm.valueChanges
            .pipe(takeUntil(this.objDestroy$))
            .subscribe(() => {
                this.objFormMessages = this.objFormValidator.processMessages(this.loginForm);
                this.cdr.detectChanges();
            })
    }



    loginFn() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.objFormMessages = this.objFormValidator.processMessages(this.loginForm);
            this.cdr.detectChanges();
            return;
        }
        const objForm = this.loginForm.getRawValue();
        this.AuthService.login(objForm);
    }
}
