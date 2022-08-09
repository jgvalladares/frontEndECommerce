import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandFormComponent } from './components/brand/brand-form/brand-form.component';
import { BrandComponent } from './components/brand/brand.component';
import { CartComponent } from './components/cart/cart.component';
import { DeliveryFormComponent } from './components/delivery-method/delivery-form/delivery-form.component';
import { DeliveryMethodComponent } from './components/delivery-method/delivery-method.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //tipo de producto
  { path: 'productType', component: ProductTypeComponent },
  { path: 'productType/edit/:id', component: ProductTypeComponent },
  //marcas
  { path: 'brand', component: BrandComponent },
  { path: 'brand/edit/:id', component: BrandFormComponent },
  //delivery method
  { path: 'delivery', component: DeliveryMethodComponent },
  { path: 'delivery/edit/:id', component: DeliveryFormComponent },
///productos
  { path: 'products', component: ProductsComponent },
  { path: 'addProduct', component: ProductFormComponent },
  { path: 'productList', component: ProductListComponent },
  { path: 'product/edit/:id', component: ProductFormComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  ///login
  { path: 'login', component: LoginComponent },
  //carrito de compras
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
