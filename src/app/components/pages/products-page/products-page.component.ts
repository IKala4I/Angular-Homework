import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterFormComponent} from '../../partial/filter-form/filter-form.component'
import {RouterLink} from '@angular/router'
import {TagFormComponent} from '../../partial/tag-form/tag-form.component'
import {TagListComponent} from '../../partial/tag-list/tag-list.component'
import {ProductListComponent} from '../../partial/product-list/product-list.component'
import {Tag} from '../../../models/tag.model'
import {ICheckbox, IProduct, ITag} from '../../../interfaces/interfaces'
import {ProductService} from '../../../services/product.service'
import {TagService} from '../../../services/tag.service'

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FilterFormComponent, RouterLink, TagFormComponent, TagListComponent, ProductListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  newTag!: ITag
  filteredProducts!: IProduct[]
  shouldHideFilterForm!: boolean
  shouldHideTagForm!: boolean
  shouldHideTagList!: boolean

  constructor(private productService: ProductService, private tagService: TagService) {
  }

  ngOnInit(): void {
    this.productService.getFilteredProducts().subscribe(filteredProducts => {
      this.filteredProducts = filteredProducts
    })

    this.newTag = new Tag(this.tagService.generateTagId(), '', '#F2D2BD')

    this.shouldHideFilterForm = false
    this.shouldHideTagForm = true
    this.shouldHideTagList = true
  }

  filterProducts(checkboxProps: ICheckbox): void {
    this.tagService.updateSelectedTags(checkboxProps)
    this.productService.filterProductsByTag(checkboxProps)
  }

  removeProduct(productId: string): void {
    this.productService.removeProduct(productId)
  }

  showTagForm(): void {
    this.shouldHideTagForm = !this.shouldHideTagForm
  }

  showEditTagForm(): void {
    this.shouldHideTagList = !this.shouldHideTagList
  }

  onAddTag() {
    this.tagService.addTag(this.newTag)
    this.shouldHideTagForm = !this.shouldHideTagForm
  }
}
