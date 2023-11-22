import {Routes} from '@angular/router';
import {ProductListComponent} from './products/product-list/product-list.component'
import {ProductDetailComponent} from './products/product-detail/product-detail.component'
import {CreateProductFormComponent} from './products/create-product-form/create-product-form.component'

export const routes: Routes = [
  {
    path: '', redirectTo: '/product-list', pathMatch: 'full'
  },
  {
    path: 'product-list', component: ProductListComponent
  },
  {
    path: 'detail/:id', component: ProductDetailComponent
  },
  {
    path: 'product-list/create-product', component: CreateProductFormComponent
  },
  {
    path: '**', redirectTo: '/product-list'
  }
];
