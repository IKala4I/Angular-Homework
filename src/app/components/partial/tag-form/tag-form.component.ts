import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITag} from '../../../interfaces/interfaces'
import {FormsModule, NgForm} from '@angular/forms'
import {TagNameValidatorDirective} from '../../../directives/tag-form-validator.directive'

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TagNameValidatorDirective],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss'
})
export class TagFormComponent {
  @Input() tag!: ITag
  @Input() submitAction!: () => void

  @Output() closedForm: EventEmitter<boolean> = new EventEmitter<boolean>()

  @ViewChild('tagForm') tagForm!: NgForm

  constructor() {
  }

  onSubmit(): void {
    this.submitAction()
    this.clearFormValidators()
  }

  closeForm(): void {
    this.closedForm.emit(true)
    this.clearFormValidators()
  }

  private clearFormValidators(): void {
    this.tagForm.control.markAsUntouched()
    this.tagForm.control.markAsPristine()
  }
}
