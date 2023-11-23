import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'
import {ProductsService} from '../services/products.service'
import {FilterFormComponent} from '../filter-form/filter-form.component'
import {ICheckbox, IProduct} from '../interfaces/interfaces'
import {CreateProductFormComponent} from '../create-product-form/create-product-form.component'
import {ProductCardComponent} from './product-card/product-card.component'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FilterFormComponent, CreateProductFormComponent, RouterLink, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private products!: IProduct[]

  filteredProducts!: IProduct[] | null
  shouldHideFilterForm!: boolean

  constructor(private productService: ProductsService) {
    console.log('Product Component constructor')
  }

  ngOnInit(): void {
    console.log('Product Component onInit')
    this.products = this.productService.getAllProducts()
    this.filteredProducts = this.products
    this.shouldHideFilterForm = false
  }

  filterProducts(checkboxProps: ICheckbox) {
    if (checkboxProps.value === 'noTags' && checkboxProps.checked)
      this.filteredProducts = this.productService.getNoTagsProducts()
    else {
      this.productService.updateSelectedTags(checkboxProps)
      this.filteredProducts = this.productService.getProductsFilteredByTags(checkboxProps.checked)
    }
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId)
    this.products = this.productService.getAllProducts()
    this.filteredProducts = this.productService.getFilteredProducts()
  }

  toggleEditMode() {
    this.shouldHideFilterForm = !this.shouldHideFilterForm
  }
}
