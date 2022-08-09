import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductType } from 'src/app/models/ProductType';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-type-form',
  templateUrl: './product-type-form.component.html',
  styleUrls: ['./product-type-form.component.css']
})
export class ProductTypeFormComponent implements OnInit {
  formGroupProductType!: FormGroup;
  ProductType!: ProductType;
  ProductTypeId!: string;
  editdata: any;

  @Output() ProductTypeNewOut = new EventEmitter();
  constructor(private modalService: NgbModal,private genericService: EcommerceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public bsModalRef: BsModalRef) {
  }
  @ViewChild('content') addview !: ElementRef;

  ngOnInit(): void {
    this.buildformGroupProductType();
  }


  addProductType(ProductType: ProductType) {
    this.genericService
      .post('ProductType', this.formGroupProductType.getRawValue())
      .subscribe((response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro agregado!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/productType']);
       
        this.ProductTypeNewOut.emit(ProductType);
      });
  }

  //Reactive Form, Validators and getters of Fields
  buildformGroupProductType() {
    this.ProductTypeId = this.route.snapshot.paramMap.get('id')!;
    if (!this.ProductTypeId) {
      this.formGroupProductType = this.formBuilder.group({
        name: [null, [Validators.required]],

      });
    } else {
      this.getProductType(this.ProductTypeId);
    }
  }

  get nameField() {
    return this.formGroupProductType.get('name');
  }

  ////////////////////77
  Clearform(){
    this.formGroupProductType.setValue({id:0,name:''})
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
    if (this.ProductTypeId != null) {
      this.updateProductType();

    } else {
      if (this.formGroupProductType.valid) {
        this.addProductType(this.formGroupProductType.value);
        this.bsModalRef.hide();
        this.formGroupProductType.reset();
      }
    }

  }

  getProductType(id: string) {
    this.genericService.get(`productType/${id}`).subscribe(
      response => {
        this.ProductType = response as ProductType;

        this.formGroupProductType = this.formBuilder.group({
          id: [this.ProductType.id, [Validators.required]],
          name: [this.ProductType.name, [Validators.required]],

        });
      }
    )
  }


  updateProductType() {
    this.genericService
      .put(`productType`, this.formGroupProductType.getRawValue())
      .subscribe((response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro actualizado!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/productType']);
      });
  }
}