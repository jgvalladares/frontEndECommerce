
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { DeliveryMethod } from 'src/app/models/DeliveryMethod';
@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit {
  formGroupDelivery!: FormGroup;
  Delivery!: DeliveryMethod;
  DeliveryId!: string;
  editdata: any;

  @Output() DeliveryNewOut = new EventEmitter();
  constructor(private modalService: NgbModal,private genericService: EcommerceService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public bsModalRef: BsModalRef) {
  }
  @ViewChild('content') addview !: ElementRef;

  ngOnInit(): void {
    this.buildformGroupDelivery();
  }


  addDelivery(Delivery: DeliveryMethod) {
    this.genericService
      .post('DeliveryMethod', this.formGroupDelivery.getRawValue())
      .subscribe((response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro agregado!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/delivery']);
       
        this.DeliveryNewOut.emit(Delivery);
      });
  }

  //Reactive Form, Validators and getters of Fields
  buildformGroupDelivery() {
    this.DeliveryId = this.route.snapshot.paramMap.get('id')!;
    if (!this.DeliveryId) {
      this.formGroupDelivery = this.formBuilder.group({
        name: [null, [Validators.required]],

      });
    } else {
      this.getDelivery(this.DeliveryId);
    }
  }

  get nameField() {
    return this.formGroupDelivery.get('name');
  }

  ////////////////////77
  Clearform(){
    this.formGroupDelivery.setValue({id:0,name:''})
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
    if (this.DeliveryId != null) {
      this.updateDelivery();

    } else {
      if (this.formGroupDelivery.valid) {
        this.addDelivery(this.formGroupDelivery.value);
        this.bsModalRef.hide();
        this.formGroupDelivery.reset();
      }
    }

  }

  getDelivery(id: string) {
    this.genericService.get(`DeliveryMethod/${id}`).subscribe(
      response => {
        this.Delivery = response as DeliveryMethod;

        this.formGroupDelivery = this.formBuilder.group({
          id: [this.Delivery.id, [Validators.required]],
          name: [this.Delivery.name, [Validators.required]],

        });
      }
    )
  }


  updateDelivery() {
    this.genericService
      .put(`DeliveryMethod`, this.formGroupDelivery.getRawValue())
      .subscribe((response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro actualizado!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/delivery']);
      });
  }
}