import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {CommonModule, Location} from '@angular/common'
import {ProductsService} from '../services/products.service'
import {FormsModule} from '@angular/forms'
import {TagsService} from '../services/tags.service'
import {Product} from '../product.model'
import {IProduct, ITag} from '../interfaces/interfaces'

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
  selectedTags!: string[]

  @ViewChild('tagSelect') tagSelect!: ElementRef<HTMLSelectElement>

  constructor(private productService: ProductsService, private tagService: TagsService, private location: Location) {

  }

  ngOnInit(): void {
    this.tags = this.tagService.getAllTags()
    this.selectedTags = []
    this.product = new Product('', 0, [], '')
  }

  goBack() {
    this.location.back()
  }

  onSubmit() {
    this.productService.addProduct(this.product)
    this.location.back()
  }

  addTag(event: Event): void {
    const select = event.target as HTMLSelectElement
    const tagName = select.value
    this.tagService.addTagByNameToProduct(this.product, tagName)
    this.selectedTags = [...this.selectedTags, tagName]
    select.options[select.selectedIndex].disabled = true
    select.value = '-1'
  }

  removeTag(tagName: string): void {
    const select = this.tagSelect.nativeElement
    const option = Array.from(select.options).find(
      (opt) => opt.value === tagName
    ) as HTMLOptionElement
    if (option) {
      option.disabled = false
    }
    this.selectedTags = this.selectedTags.filter((tag) => tag !== tagName)
    this.tagService.removeTagByNameFromProduct(this.product, tagName)
  }
}
