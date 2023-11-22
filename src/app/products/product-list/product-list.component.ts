import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Router} from '@angular/router'
import {IProduct, ITag} from '../product.model'
import PRODUCTS from '../mock-data/products'
import TAGS from '../mock-data/tags'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private products!: IProduct[]
  tags!: ITag[]

  filteredProducts?: IProduct[]
  selectedTags!: string[]

  isNoTags: boolean = false

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.products = PRODUCTS
    this.tags = TAGS
    this.filteredProducts = this.products
    this.selectedTags = []
  }

  public showDetail(id: string) {
    this.router.navigate(['detail', id])
  }

  public onCheckChange(event: Event) {
    const input = event.target as HTMLInputElement

    if (input.value === 'noTags') {
      if (input.checked) {
        this.isNoTags = true
        this.filteredProducts = this.products.filter(product => !product.tags)
      } else {
        this.isNoTags = false
        if (this.selectedTags.length) {
          this.filteredProducts = this.products.filter(product => {
            if (product.tags) {
              const names: string[] = product.tags.map(tag => tag.name)
              let isContainAllTags = true
              this.selectedTags.every(tag => {
                if (!names.includes(tag)) {
                  isContainAllTags = false
                  return false
                }
                return true
              })
              if (isContainAllTags)
                return product
            }
            return
          })
        } else
          this.filteredProducts = this.products
      }
    } else {
      if (input.checked) {
        this.filteredProducts = this.filteredProducts?.filter(product => {
          if (product.tags) {
            const names: string[] = product.tags.map(tag => tag.name)
            if (names.includes(input.value))
              return product
          }
          return
        })
        this.selectedTags.push(input.value)
      } else {
        this.selectedTags = this.selectedTags.filter(tag => tag !== input.value)

        if (this.selectedTags.length) {
          this.filteredProducts = this.products.filter(product => {
            if (product.tags) {
              const names: string[] = product.tags.map(tag => tag.name)
              let isContainAllTags = true
              this.selectedTags.every(tag => {
                if (!names.includes(tag)) {
                  isContainAllTags = false
                  return false
                }
                return true
              })
              if (isContainAllTags)
                return product
            }
            return
          })
        } else
          this.filteredProducts = this.products
      }
    }
  }
}
