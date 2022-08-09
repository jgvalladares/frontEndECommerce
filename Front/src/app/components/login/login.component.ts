import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroupLogin!: FormGroup;
  passwordMessage: string = "";
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder ) { }

 
  ngOnInit(): void {
    this.buildFormGroupLogin();
    // alert('USUARIOS PARA AUTENTICARSE:\nUsuario:Gaby, Contraseña: admin\nUsuario:User, Contraseña: user);
  }

  login(loginBody: Login, rol: string) {
    this.authService.login(loginBody, rol);
  }

  buildFormGroupLogin() {
    this.formGroupLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['user', Validators.required],
    });
  }

  get userNameField() {
    return this.formGroupLogin.get('userName');
  }
  get passwordField() {
    return this.formGroupLogin.get('password');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formGroupLogin.valid) {
      this.login(
        this.formGroupLogin.getRawValue(),
        this.formGroupLogin.get('rol')?.value
      );
    }
  }
}