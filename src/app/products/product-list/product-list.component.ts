import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Router} from '@angular/router'
import {IProduct} from '../product.model'
import {ProductsService} from '../services/products.service'
import {FilterFormComponent} from '../filter-form/filter-form.component'
import {ICheckbox} from '../interfaces/interfaces'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FilterFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private products!: IProduct[]

  filteredProducts!: IProduct[] | null

  constructor(private router: Router, private productService: ProductsService) {
    console.log('Product Component constructor')
  }

  ngOnInit(): void {
    console.log('Product Component onInit')
    this.products = this.productService.getAllProducts()
    this.filteredProducts = this.products
  }

  public showDetail(id: string) {
    this.router.navigate(['detail', id])
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
}
