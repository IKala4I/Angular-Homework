import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router'
import {IProduct, ITag} from '../../product.model'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {TagsService} from '../../services/tags.service'

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

  @Input() product!: IProduct
  @Input() isEditButtonDisabled!: boolean
  @Output() productDeleted: EventEmitter<string> = new EventEmitter<string>()
  @Output() editModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private router: Router, private tagService: TagsService) {
  }

  ngOnInit(): void {
    this.isEditMode = false
    this.selectedTags = []
    this.tags = this.tagService.getAllTags().filter(tag => {
      if (this.product.tags.includes(tag)) {
        this.selectedTags = [...this.selectedTags, tag.name]
        return
      }
      return tag
    })
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
  }

  addTag(event: Event) {
    const select = event.target as HTMLSelectElement
    const tagName = select.value
    this.tagService.addTagByNameToProduct(this.product, tagName)
    this.tags = this.tags.filter(tag => tag.name !== tagName)
    this.selectedTags = [...this.selectedTags, tagName]
    select.value = '-1'
  }
}
