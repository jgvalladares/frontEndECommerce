
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  formGroupbrand!: FormGroup;
  brand!: Brand;
  brandId!: string;
  editdata: any;

  @Output() brandNewOut = new EventEmitter();
  constructor(private modalService: NgbModal,private genericService: EcommerceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public bsModalRef: BsModalRef) {
  }
  @ViewChild('content') addview !: ElementRef;

  ngOnInit(): void {
    this.buildformGroupBrand();
  }


  addBrand(brand: Brand) {
    this.genericService
      .post('Brand', this.formGroupbrand.getRawValue())
      .subscribe((response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro agregado!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/brand']);
       
        this.brandNewOut.emit(brand);
      });
  }

  //Reactive Form, Validators and getters of Fields
  buildformGroupBrand() {
    this.brandId = this.route.snapshot.paramMap.get('id')!;
    if (!this.brandId) {
      this.formGroupbrand = this.formBuilder.group({
        name: [null, [Validators.required]],

      });
    } else {
      this.getbrand(this.brandId);
    }
  }

  get nameField() {
    return this.formGroupbrand.get('name');
  }

  ////////////////////77
  Clearform(){
    this.formGroupbrand.setValue({id:0,name:''})
  }

  open() {
    this.Clearform();
    this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }
  ////////////////////////
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.brandId != null) {
      this.updateBrand();

    } else {
      if (this.formGroupbrand.valid) {
        this.addBrand(this.formGroupbrand.value);
        this.bsModalRef.hide();
        this.formGroupbrand.reset();
      }
    }

  }

  getbrand(id: string) {
    this.genericService.get(`Brand/${id}`).subscribe(
      response => {
        this.brand = response as Brand;

        this.formGroupbrand = this.formBuilder.group({
          id: [this.brand.id, [Validators.required]],
          name: [this.brand.name, [Validators.required]],

        });
      }
    )
  }


  updateBrand() {
    this.genericService
      .put(`Brand`, this.formGroupbrand.getRawValue())
      .subscribe((response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro actualizado!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/brand']);
      });
  }
}