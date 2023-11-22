import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router'
import {IProduct} from '../product.model'
import PRODUCTS from '../mock-data/products'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product?: IProduct;
  id!: string | null;

  constructor(private location: Location, private activatedRoute: ActivatedRoute) {
    console.log('Product Detail Component constructor')
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.product = PRODUCTS.find(product => product.id === this.id)
  }

  goBack() {
    this.location.back()
  }
}
