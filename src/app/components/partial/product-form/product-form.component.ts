import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {IProduct, ITag} from '../../../interfaces/interfaces'
import {ProductService} from '../../../services/product.service'
import {TagService} from '../../../services/tag.service'
import {Product} from '../../../models/product.model'
import {FormsModule} from '@angular/forms'
import {TagBackgroundDirective} from '../../../directives/tag-background.directive'

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TagBackgroundDirective],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  tags!: ITag[]
  selectedTags!: string[]

  @Input() product!: IProduct
  @Input() submitAction!: () => void

  @ViewChild('tagSelect') tagSelect!: ElementRef<HTMLSelectElement>

  constructor(private tagService: TagService) {
  }

  ngOnInit(): void {
    this.tags = this.tagService.getAllTags()

    if (this.product.tags.length)
      this.selectedTags = this.product.tags.map(tag => tag.name)
    else
      this.selectedTags = []
  }

  onSubmit() {
    this.submitAction()
  }

  addTag(event: Event): void {
    const select = event.target as HTMLSelectElement
    const tagName = select.value

    const tag = this.tagService.findTagByName(tagName)
    this.product.addTag(tag)
    this.selectedTags = [...this.selectedTags, tagName]

    select.options[select.selectedIndex].disabled = true
    select.value = '-1'
  }

  removeTag(tagName: string): void {
    const select = this.tagSelect.nativeElement
    const option = Array.from(select.options).find(opt => opt.value === tagName) as HTMLOptionElement

    if (option)
      option.disabled = false

    this.selectedTags = this.selectedTags.filter((tag) => tag !== tagName)
    this.product.removeTagByName(tagName)
  }

  getIsDisabled(tagName: string): boolean {
    return this.selectedTags.includes(tagName)
  }

  getTagBackground(tagName: string): string {
    return this.tagService.findTagByName(tagName).backgroundColor
  }
}

