import {Directive, ElementRef, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms'
import {TagService} from '../services/tag.service'
import {ITag} from '../interfaces/interfaces'
import {Destroyer} from '../utils/destroyer'
import {takeUntil} from 'rxjs'

@Directive({
  selector: '[appTagNameValidator]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: TagNameValidatorDirective,
    multi: true,
  }],
})
export class TagNameValidatorDirective extends Destroyer implements Validator {
  private tags!: ITag[]
  @Input('appTagNameValidator') initName!: string

  constructor(private tagService: TagService, private el: ElementRef) {
    super()

    this.tagService.getAllTagsAsObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tags => {
        this.tags = tags
      })
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return ifNameExist(this.tags, control.value, this.initName) ? {'tagNameExists': true} : null
  }
}

function ifNameExist(tags: ITag[], name: string, initName: string): boolean {
  return initName === name ? false : tags.map(tag => tag.name).includes(name)
}
