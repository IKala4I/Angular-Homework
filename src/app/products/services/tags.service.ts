import {Injectable} from '@angular/core';
import TAGS from '../mock-data/tags'
import {ITag} from '../product.model'
import {ICheckbox} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly tags: ITag[]
  private _isNoTags: boolean = false

  selectedTags: string[]

  get isNoTags() {
    return this._isNoTags
  }

  set isNoTags(value: boolean) {
    this._isNoTags = value
  }

  constructor() {
    console.log('Tag Service constructor')
    this.tags = TAGS
    this.selectedTags = []
  }

  getAllTags(): ITag[] {
    return this.tags
  }

  updateSelectedTags(checkboxProps: ICheckbox) {
    if (checkboxProps.checked && checkboxProps.value !== 'noTags')
      this.selectedTags.push(checkboxProps.value)
    else
      this.selectedTags = this.selectedTags.filter(tagName => tagName !== checkboxProps.value)
  }
}
