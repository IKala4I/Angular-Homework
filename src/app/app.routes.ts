import {Routes} from '@angular/router';
import {ProductsPageComponent} from './components/pages/products-page/products-page.component'
import {ProductDetailPageComponent} from './components/pages/product-detail-page/product-detail-page.component'
import {CreateProductPageComponent} from './components/pages/create-product-page/create-product-page.component'

export const routes: Routes = [
  {
    path: '', redirectTo: '/product-list', pathMatch: 'full'
  },
  {
    path: 'product-list', component: ProductsPageComponent
  },
  {
    path: 'detail/:id', component: ProductDetailPageComponent
  },
  {
    path: 'product-list/create-product', component: CreateProductPageComponent
  },
  {
    path: '**', redirectTo: '/product-list'
  }
];
