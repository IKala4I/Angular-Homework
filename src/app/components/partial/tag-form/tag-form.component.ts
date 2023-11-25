import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITag} from '../../../interfaces/interfaces'
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss'
})
export class TagFormComponent {
  @Input() tag!: ITag
  @Input() submitAction!: () => void

  @Output() closedForm: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() {
  }

  onSubmit(): void {
    this.submitAction()
  }

  closeForm(): void {
    this.closedForm.emit(true)
  }
}
