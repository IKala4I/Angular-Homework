import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ProductFormComponent} from '../../partial/product-form/product-form.component'
import {IProduct} from '../../../interfaces/interfaces'
import {ProductService} from '../../../services/product.service'
import {Product} from '../../../models/product.model'

@Component({
  selector: 'app-create-product-page',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './create-product-page.component.html',
  styleUrl: './create-product-page.component.scss'
})
export class CreateProductPageComponent implements OnInit {
  product!: IProduct

  constructor(private location: Location, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.product = new Product('', 1, [], '')
  }

  goBack(): void {
    this.location.back()
  }

  onAddProduct(): void {
    this.productService.addProduct(this.product)
    this.location.back()
  }
}
