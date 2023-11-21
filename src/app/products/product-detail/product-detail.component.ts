import {Component} from '@angular/core';
import {CommonModule, Location} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back()
  }
}
