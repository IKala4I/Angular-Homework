import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITag} from '../../../../interfaces/interfaces'
import {TagService} from '../../../../services/tag.service'
import {TagFormComponent} from '../../tag-form/tag-form.component'

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, TagFormComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent implements OnInit {
  private prevTag!: ITag

  isEditMode!: boolean

  @Input() tag!: ITag
  @Input() isEditButtonDisabled!: boolean

  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>()
  @Output() editModeToggled: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private tagService: TagService) {
  }

  ngOnInit(): void {
    this.isEditMode = false
    this.prevTag = Object.assign({}, this.tag)
  }

  toggleEditForm(): void {
    this.isEditMode = !this.isEditMode
    this.editModeToggled.emit(this.isEditMode)
  }

  onSaveChanges(): void {
    this.isEditMode = false
    this.editModeToggled.emit(this.isEditMode)
  }

  removeTag(tagId: number): void {
    this.tagRemoved.emit(tagId)
  }

  getTagBackground(tagName: string): string {
    return this.tagService.findTagByName(tagName).backgroundColor
  }

  onClosedForm(): void {
    this.tag.name = this.prevTag.name
    this.tag.backgroundColor = this.prevTag.backgroundColor
    this.toggleEditForm()
  }
}
