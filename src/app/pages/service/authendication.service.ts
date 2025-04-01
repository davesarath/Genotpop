import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { catchError, take, tap } from 'rxjs';

interface Ilogin {
    email: string;
    password: string;
}

export interface IloginResp extends Ilogin {
    token: string;
}

@Injectable()
export class AuthenticationService {
    private getApiBaseUrl = "";
    constructor(private objHttpService: HttpClient, private objConfigService: ConfigService) { 
        this.getApiBaseUrl = objConfigService.getApiBaseUrl();
    }


    login(objForm:Ilogin) {
        return new Promise((resolve, reject) => {
            return this.objHttpService.post(this.getApiBaseUrl + this.objConfigService.getConfig().loginEndpoint, objForm).pipe(take(1), tap(() => { 
                resolve(true);
            }),catchError((error)=>{
                reject("invalid data")
                return error;
            })).subscribe(((objResp:any)=>{
                this.setLocalStorage({...objResp,...objForm})
            }))
        })
    }


    private setLocalStorage(data:IloginResp){
        localStorage.setItem("accessToken",data.token);
        localStorage.setItem("strEmail",data.email);
    }
    
    private ClearLocalStorage(data:IloginResp){
        localStorage.clear();
    }

    
    private SetTokenLocalStorage(strToken:string){
        localStorage.setItem("accessToken",strToken);
    }
    
}