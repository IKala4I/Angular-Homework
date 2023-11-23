import {Injectable} from '@angular/core';
import TAGS from '../mock-data/tags'
import {ICheckbox, IProduct, ITag} from '../interfaces/interfaces';

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

  private findTagById(tagId: number): ITag {
    return this.tags.find(tag => tag.id === tagId) as ITag
  }

  private findTagByName(tagName: string): ITag {
    return this.tags.find(tag => tag.name === tagName) as ITag
  }

  addTagByIdToProduct(product: IProduct, tagId: number) {
    const tag = this.findTagById(tagId)
    product.addTag(tag)
  }

  addTagByNameToProduct(product: IProduct, tagName: string) {
    const tag = this.findTagByName(tagName)
    product.addTag(tag)
  }

  removeTagByNameFromProduct(product: IProduct, tagName: string) {
    const tag = this.findTagByName(tagName)
    product.removeTagById(tag.id)
  }
}
