import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {TagService} from '../../services/tag.service'
import {IProduct, ITag} from '../../interfaces/interfaces'
import {TagBackgroundDirective} from '../../directives/tag-background.directive'
import {ProductFormComponent} from '../../product-form/product-form.component'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TagBackgroundDirective, ProductFormComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  isEditMode!: boolean
  tags!: ITag[]

  @Input() product!: IProduct
  @Input() isEditButtonDisabled!: boolean
  @Output() productRemoved: EventEmitter<string> = new EventEmitter<string>()
  @Output() editModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private router: Router, private tagService: TagService) {
  }

  ngOnInit(): void {
    this.isEditMode = false
    this.tags = this.tagService.getAllTags()
  }

  showDetail(id: string): void {
    this.router.navigate(['detail', id])
  }

  toggleEditForm(): void {
    this.isEditMode = !this.isEditMode
    this.editModeToggled.emit(this.isEditMode)
  }

  onSubmit() {
    this.isEditMode = false
    this.editModeToggled.emit(this.isEditMode)
  }

  removeProduct(productId: string): void {
    this.productRemoved.emit(productId)
  }

  getTagBackground(tagName: string): string {
    return this.tagService.findTagByName(tagName).backgroundColor
  }
}
