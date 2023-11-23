import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagService} from '../services/tag.service'
import {ICheckbox, ITag} from '../interfaces/interfaces'
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit, OnDestroy {
  tags!: ITag[];

  isNoTags!: boolean
  @Output() tagChecked: EventEmitter<ICheckbox> = new EventEmitter<ICheckbox>()

  constructor(private tagService: TagService) {
  }

  ngOnDestroy(): void {
    this.tagService.clearSelectedTags()
  }

  ngOnInit(): void {
    this.tags = this.tagService.getAllTags()
    this.isNoTags = false
  }

  onCheckChange(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.value === 'noTags') {
      this.isNoTags = input.checked
    }

    this.tagChecked.emit({
      value: input.value,
      checked: input.checked
    })
  }
}
