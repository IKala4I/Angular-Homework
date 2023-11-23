import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router'
import {ProductsService} from '../services/products.service'
import {IProduct} from '../interfaces/interfaces'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product?: IProduct;

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private productService: ProductsService) {
    console.log('Product Detail Component constructor')
  }

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id')
    this.product = this.productService.findProductById(id)
  }

  goBack() {
    this.location.back()
  }
}
