import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITag} from '../interfaces/interfaces'
import {TagService} from '../services/tag.service'
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss'
})
export class TagFormComponent {
  @Input()tag!: ITag
  @Output() closedForm: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private tagService: TagService) {}

  onSubmit(): void {
    this.tagService.addTag(this.tag)
  }

  closeForm(): void {
    this.closedForm.emit(true)
  }
}
