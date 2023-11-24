import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagBackgroundDirective} from '../../../../directives/tag-background.directive'
import {ITag} from '../../../../interfaces/interfaces'
import {TagService} from '../../../../services/tag.service'
import {TagFormComponent} from '../../tag-form/tag-form.component'
import {ProductService} from '../../../../services/product.service'

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, TagBackgroundDirective, TagFormComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent implements OnInit {
  @Input() tag!: ITag

  isEditMode!: boolean

  @Input() isEditButtonDisabled!: boolean
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>()
  @Output() editModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>()
  // @Output() changesSaved: EventEmitter<unknown> = new EventEmitter<unknown>()

  constructor(private tagService: TagService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isEditMode = false
  }

  toggleEditForm(): void {
    this.isEditMode = !this.isEditMode
    this.editModeToggled.emit(this.isEditMode)
  }

  onSaveChanges() {
    this.isEditMode = false
    this.editModeToggled.emit(this.isEditMode)
    // this.changesSaved.emit()
  }

  removeTag(tagId: number): void {
    this.tagRemoved.emit(tagId)
  }

  getTagBackground(tagName: string): string {
    return this.tagService.findTagByName(tagName).backgroundColor
  }
}
