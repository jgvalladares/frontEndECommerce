import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductType } from 'src/app/models/ProductType';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { ProductTypeFormComponent } from './product-type-form/product-type-form.component';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {
  ProductTypes: ProductType[] = [];
  bsModalRef!: BsModalRef;
  constructor(private httpService: EcommerceService, private modalService: BsModalService,) { }
  @ViewChild(ProductTypeFormComponent)
  addView!: ProductTypeFormComponent;
  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes() {
    this.httpService.get('productType?sort=Name&order=Asc&limit=5&offset=0').subscribe(response => {
      this.ProductTypes = response as ProductType[];
    });
  }

  deleteProductType(ProductTypeId: string) {
    this.httpService.delete(`productType/${ProductTypeId}`).subscribe(response => {
      this.ProductTypes = this.ProductTypes.filter(ProductType => ProductType.id != ProductTypeId);
    })
  }

  ProductTypeNewOut(ProductType: ProductType) {
    this.ProductTypes.push(ProductType);
  }

  /////////////modal
  openModalWithComponent() {

    this.bsModalRef = this.modalService.show(ProductTypeFormComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  functionEdit(id:string) {

    this.addView.getProductType(id);
  }

  ////////////////////7
}
