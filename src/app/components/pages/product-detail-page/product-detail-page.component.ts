import {Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ProductDetailComponent} from '../../partial/product-detail/product-detail.component'

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent {
  constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back()
  }
}
