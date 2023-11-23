import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagsService} from '../services/tags.service'
import {ICheckbox, ITag} from '../interfaces/interfaces'

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss'
})
export class FilterFormComponent implements OnInit {
  tags!: ITag[];

  isNoTags!: boolean
  @Output() tagChecked: EventEmitter<ICheckbox> = new EventEmitter<ICheckbox>()

  constructor(private tagService: TagsService) {
    console.log('Filter Form Component constructor')
  }

  ngOnInit(): void {
    console.log('Filter Form Component onInit')
    this.tags = this.tagService.getAllTags()
    this.isNoTags = false
  }

  onCheckChange(event: Event) {
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
