import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryMethod } from 'src/app/models/DeliveryMethod';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
@Component({
  selector: 'app-delivery-method',
  templateUrl: './delivery-method.component.html',
  styleUrls: ['./delivery-method.component.css']
})
export class DeliveryMethodComponent implements OnInit {
  DeliveryMethods: DeliveryMethod[] = [];
  bsModalRef!: BsModalRef;
  constructor(private httpService: EcommerceService, private modalService: BsModalService,) { }
  @ViewChild(DeliveryFormComponent)
  addView!: DeliveryFormComponent;
  ngOnInit(): void {
    this.getDeliveryMethods();
  }

  getDeliveryMethods() {
    this.httpService.get('DeliveryMethod?sort=Name&order=Asc&limit=5&offset=0').subscribe(response => {
      this.DeliveryMethods = response as DeliveryMethod[];
    });
  }

  deleteDeliveryMethod(DeliveryMethodId: string) {
    this.httpService.delete(`DeliveryMethod/${DeliveryMethodId}`).subscribe(response => {
      this.DeliveryMethods = this.DeliveryMethods.filter(DeliveryMethod => DeliveryMethod.id != DeliveryMethodId);
    })
  }

  DeliveryMethodNewOut(DeliveryMethod: DeliveryMethod) {
    this.DeliveryMethods.push(DeliveryMethod);
  }

  /////////////modal
  openModalWithComponent() {

    this.bsModalRef = this.modalService.show(DeliveryFormComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ////////////////////7
}


