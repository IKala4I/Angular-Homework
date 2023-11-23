import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink} from '@angular/router'
import {ProductService} from '../services/product.service'
import {FilterFormComponent} from '../filter-form/filter-form.component'
import {ICheckbox, IProduct, ITag} from '../interfaces/interfaces'
import {CreateProductFormComponent} from '../create-product-form/create-product-form.component'
import {ProductCardComponent} from './product-card/product-card.component'
import {FormsModule} from '@angular/forms'
import {TagService} from '../services/tag.service'
import {TagBackgroundDirective} from '../directives/tag-background.directive'
import {TagFormComponent} from '../tag-form/tag-form.component'
import {Tag} from '../tag.model'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FilterFormComponent, CreateProductFormComponent,
    RouterLink, ProductCardComponent, FormsModule,
    TagBackgroundDirective, TagFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private products!: IProduct[]
  tags!: ITag[]

  filteredProducts!: IProduct[] | null
  shouldHideFilterForm!: boolean
  shouldHideTagForm!: boolean
  shouldHideEditTagForm!: boolean

  constructor(private productService: ProductService, private tagService: TagService) {
  }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts()
    this.tags = this.tagService.getAllTags()
    this.filteredProducts = this.products
    this.shouldHideFilterForm = false
    this.shouldHideTagForm = true
    this.shouldHideEditTagForm = true
  }

  filterProducts(checkboxProps: ICheckbox): void {
    if (checkboxProps.value === 'noTags' && checkboxProps.checked)
      this.filteredProducts = this.productService.getNoTagProducts()
    else {
      this.tagService.updateSelectedTags(checkboxProps)
      this.filteredProducts = this.productService.getProductsFilteredByTags(checkboxProps.checked)
    }
  }

  deleteProduct(productId: string): void {
    this.products = this.productService.removeProduct(productId)
    this.filteredProducts = this.productService.getFilteredProducts()
  }

  toggleEditMode(): void {
    this.shouldHideFilterForm = !this.shouldHideFilterForm
  }

  showTagForm(): void {
    this.shouldHideTagForm = !this.shouldHideTagForm
  }

  showEditTagForm(): void {
    this.shouldHideEditTagForm = !this.shouldHideEditTagForm
  }

  getTagBackground(tagName: string): string {
    return this.tagService.findTagByName(tagName).backgroundColor
  }

  removeTag(tagId: number): void {
    this.tagService.removeTagById(tagId)
  }

  createNewTag(): ITag {
    return new Tag(this.tagService.generateTagId(), '', 'bisque')
  }
}
