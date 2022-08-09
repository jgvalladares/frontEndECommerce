import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenDto } from "../models/tokenDto";
import { Login } from "../models/login";
import { LoaderService } from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    API_URL: string = environment.API_URL;
    token! : TokenDto;
    constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService, private loaderService: LoaderService) {

    }
    
    // Obtener Token, guardarlo en el localstorage, e iniciar sesion
    login(loginBody: Login, rol: string) {
        this.loaderService.loaderState();
        return this.http.post(`${this.API_URL}Token`, loginBody)
        .subscribe(res=>{
            this.token = res as TokenDto;
            this.setSession(this.token.token);
            if(rol == 'user'){
                this.router.navigate(['/products']);
            }else if(rol == 'admin'){
                this.router.navigate(['/productList']);
            }
            this.loaderService.loaderState(false);
        });
    }
          
    private setSession(authResult: any) {
        localStorage.setItem('id_token', authResult);
    } 

    //Remover token del localstorage y regresar al login
    logout() {
        localStorage.removeItem("id_token");
        this.router.navigate(['/login']);
    }

    //Validar si el token ha expirado
    isAuthenticated(): boolean {
        const token = localStorage.getItem('id_token');
        return !this.jwtHelper.isTokenExpired(token!);
    }
}