import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal,private router: Router, private authService: AuthService, private formBuilder: FormBuilder ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  open(content: any) {
    this.modalService.open(content);
  }
  formGroupLogin!: FormGroup;
  passwordMessage: string = "";

  ngOnInit(): void {


  }
}