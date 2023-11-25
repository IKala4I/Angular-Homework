import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagService} from '../../../services/tag.service'
import {ICheckbox, ITag} from '../../../interfaces/interfaces'
import {FormsModule} from '@angular/forms'
import {ProductService} from '../../../services/product.service'
import {Destroyer} from '../../../utils/destroyer'
import {takeUntil} from 'rxjs'

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent extends Destroyer implements OnInit {
  tags!: ITag[]
  isNoTags!: boolean

  @Output() tagChecked: EventEmitter<ICheckbox> = new EventEmitter<ICheckbox>()

  constructor(private tagService: TagService, private productService: ProductService) {
    super()
  }

  ngOnInit(): void {
    this.tagService.getAllTagsAsObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tags => {
        this.tags = tags
      })

    this.tagService.getIsNoTagSelectedAsObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isNoTags => {
        this.isNoTags = isNoTags
      })
  }

  onCheckChange(event: Event): void {
    const input = event.target as HTMLInputElement

    this.tagChecked.emit({
      value: input.value,
      checked: input.checked
    })
  }

  isSelected(tagName: string): boolean {
    return this.tagService.getIfTagSelected(tagName)
  }

  isAnySelected(): boolean {
    return this.isNoTags || this.tagService.selectedTags.length > 0
  }

  resetFilterForm(): void {
    this.tagService.clearSelectedTags()
    this.productService.resetFilteredProducts()
  }
}
