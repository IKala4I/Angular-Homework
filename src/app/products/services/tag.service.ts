import {Injectable} from '@angular/core';
import TAGS from '../mock-data/tags'
import {ICheckbox, IProduct, ITag} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tags: ITag[]
  selectedTags: string[]

  constructor() {
    this.tags = TAGS
    this.selectedTags = []
  }

  getAllTags(): ITag[] {
    return this.tags
  }

  clearSelectedTags(): void {
    this.selectedTags = []
  }

  updateSelectedTags(checkboxProps: ICheckbox): void {
    if (checkboxProps.checked && checkboxProps.value !== 'noTags')
      this.selectedTags = [...this.selectedTags, checkboxProps.value]
    else
      this.selectedTags = this.selectedTags.filter(tagName => tagName !== checkboxProps.value)
  }

  findTagByName(tagName: string): ITag {
    return this.tags.find(tag => tag.name === tagName) as ITag
  }

  private findTagById(tagId: number): ITag {
    return this.tags.find(tag => tag.id === tagId) as ITag
  }

  generateTagId(): number {
    return this.tags.length + 1
  }

  addTag(tag: ITag): void {
    this.tags = [...this.tags, tag]
  }

  removeTagById(tagId: number): void {
    const tag = this.findTagById(tagId)
    if (this.selectedTags.includes(tag.name))
      this.selectedTags = this.selectedTags.filter(tagName => tagName !== tag.name)

    this.tags = this.tags.filter(tag => tag.id !== tagId)
  }
}
