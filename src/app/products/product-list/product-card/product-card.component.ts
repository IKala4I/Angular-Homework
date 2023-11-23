import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {TagsService} from '../../services/tags.service'
import {IProduct, ITag} from '../../interfaces/interfaces'
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  isEditMode!: boolean
  tags!: ITag[]
  selectedTags!: string[]

  @ViewChild('tagSelect') tagSelect!: ElementRef<HTMLSelectElement>

  @Input() product!: IProduct
  @Input() isEditButtonDisabled!: boolean
  @Output() productDeleted: EventEmitter<string> = new EventEmitter<string>()
  @Output() editModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private router: Router, private tagService: TagsService, private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.isEditMode = false
    this.selectedTags = []
    this.tags = this.tagService.getAllTags()
    this.tags.forEach(tag => {
        if (this.product.tags.includes(tag)) {
          this.selectedTags = [...this.selectedTags, tag.name]
        }
      }
    )
  }

  public showDetail(id: string) {
    this.router.navigate(['detail', id])
  }

  toggleEditForm() {
    this.isEditMode = !this.isEditMode
    this.editModeToggled.emit(this.isEditMode)
  }

  deleteProduct(productId: string) {
    this.productDeleted.emit(productId)
  }

  onSubmit() {
    this.isEditMode = !this.isEditMode
    this.editModeToggled.emit(this.isEditMode)
    this.productService.updateProducts()
  }

  addTag(event: Event) {
    const select = event.target as HTMLSelectElement
    const tagName = select.value
    this.tagService.addTagByNameToProduct(this.product, tagName)
    this.selectedTags = [...this.selectedTags, tagName]
    select.value = '-1'
  }

  removeTag(tagName: string) {
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

  getIsDisabled(tagName: string): boolean {
    return this.selectedTags.includes(tagName)
  }
}
