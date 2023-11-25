import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITag} from '../../../interfaces/interfaces'
import {TagService} from '../../../services/tag.service'
import {TagComponent} from './tag/tag.component'
import {ProductService} from '../../../services/product.service'
import {Destroyer} from '../../../utils/destroyer'
import {takeUntil} from 'rxjs'

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, TagComponent],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent extends Destroyer implements OnInit {
  tags!: ITag[]
  isEditButtonDisabled!: boolean

  constructor(private tagService: TagService, private productService: ProductService) {
    super()
  }

  ngOnInit(): void {
    this.tagService.getAllTagsAsObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tags => {
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
}
