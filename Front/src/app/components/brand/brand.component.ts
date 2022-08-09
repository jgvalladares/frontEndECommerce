import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { BrandFormComponent } from './brand-form/brand-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  bsModalRef!: BsModalRef;
  constructor(private httpService: EcommerceService, private modalService: BsModalService,) { }
  @ViewChild(BrandFormComponent)
  addView!: BrandFormComponent;
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.httpService.get('Brand?sort=Name&order=Asc&limit=5&offset=0').subscribe(response => {
      this.brands = response as Brand[];
    });
  }

  deleteBrand(brandId: string) {
    this.httpService.delete(`Brand/${brandId}`).subscribe(response => {
      this.brands = this.brands.filter(brand => brand.id != brandId);
    })
  }

  brandNewOut(brand: Brand) {
    this.brands.push(brand);
  }

  /////////////modal
  openModalWithComponent() {

    this.bsModalRef = this.modalService.show(BrandFormComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  functionEdit(id:string) {

    this.addView.getbrand(id);
  }

  ////////////////////7
}
