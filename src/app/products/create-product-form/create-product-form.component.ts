import {Component, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ProductsService} from '../services/products.service'
import {FormsModule} from '@angular/forms'
import {TagsService} from '../services/tags.service'
import {IProduct, ITag, Product} from '../product.model'

@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.scss'
})
export class CreateProductFormComponent implements OnInit {
  tags!: ITag[]
  product!: IProduct

  constructor(private productService: ProductsService, private tagService: TagsService, private location:Location) {

  }

  ngOnInit(): void {
    this.tags = this.tagService.getAllTags()
    this.product = new Product('', 0, [], '')
  }

  goBack(){
    this.location.back()
  }
  onSubmit() {
    console.log('submit')
    this.productService.addProduct(this.product)
    this.location.back()
  }

  addTag(event: Event): void {
    const select = event.target as HTMLSelectElement
    const tagId = Number(select.value)
    this.tagService.addTagByIdToProduct(this.product, tagId)
    this.tags = this.tags.filter(tag => tag.id !== tagId)
    select.value = '-1'
  }
}
