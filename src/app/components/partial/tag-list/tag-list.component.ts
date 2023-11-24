import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITag} from '../../../interfaces/interfaces'
import {TagService} from '../../../services/tag.service'
import {TagComponent} from './tag/tag.component'
import {ProductService} from '../../../services/product.service'

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent implements OnInit {
  tags!: ITag[]
  isEditButtonDisabled!: boolean

  constructor(private tagService: TagService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.tagService.getAllTagsAsObservable().subscribe(tags => {
      this.tags = tags
    })
    this.isEditButtonDisabled = false
  }

  removeTag(tagId: number): void {
    this.tagService.removeTagById(tagId)
    this.productService.removeTagFromProductsById(tagId)
  }

  toggleStateEditButton(): void {
    this.isEditButtonDisabled = !this.isEditButtonDisabled
  }

  // updateTags(): void {
  //   this.tagService.updateTags(this.tagService.getAllTags())
  //   this.productService.updateFilteredProducts()
  // }
}
