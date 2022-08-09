import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { BrandComponent } from './components/brand/brand.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { CartComponent } from './components/cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//////importaciones de seguridad para login
import { AuthService } from './services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrandFormComponent } from './components/brand/brand-form/brand-form.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductTypeFormComponent } from './components/product-type/product-type-form/product-type-form.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { DeliveryMethodComponent } from './components/delivery-method/delivery-method.component';
import { DeliveryFormComponent } from './components/delivery-method/delivery-form/delivery-form.component';
import { LoaderService } from './services/loader.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BrandComponent,
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    ProductTypeComponent,
    CartComponent,
    BrandFormComponent,
    ProductFormComponent,
    ProductTypeFormComponent,
    ProductListComponent,
    ProductDetailComponent,
    DeliveryMethodComponent,
    DeliveryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    NgbModule, BrowserAnimationsModule,
  ],
  providers: [BsModalService,AuthService,LoaderService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
