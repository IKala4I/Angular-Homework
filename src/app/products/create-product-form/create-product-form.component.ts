import {Component, inject, OnInit} from '@angular/core'
import {CommonModule, Location} from '@angular/common'
import {ProductFormComponent} from '../product-form/product-form.component'
import {Product} from '../product.model'
import {IProduct} from '../interfaces/interfaces'
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.scss'
})
export class CreateProductFormComponent implements OnInit {

  product!: IProduct
  private productService = inject(ProductService)

  constructor(private location: Location) {
    console.log(this.productService) //okey
  }

  ngOnInit(): void {
    this.product = new Product('', 0, [], '')
  }

  goBack(): void {
    this.location.back()
  }

  onSubmit() {
    console.log(this.productService) //undefined
    this.productService.addProduct(this.product)
    this.location.back()
  }
}
