import {Injectable} from '@angular/core';
import TAGS from '../constants/mock-data/tags'
import {ICheckbox, ITag} from '../interfaces/interfaces';
import {BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tags$: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>(TAGS)
  private selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])
  private isNoTagSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  get selectedTags(): string[] {
    return this.selectedTags$.getValue()
  }

  get isNoTagSelected(): boolean {
    return this.isNoTagSelected$.getValue()
  }

  constructor() {}

  getAllTagsAsObservable(): Observable<ITag[]> {
    return this.tags$
  }

  getIsNoTagSelectedAsObservable(): Observable<boolean> {
    return this.isNoTagSelected$
  }

  getAllTags(): ITag[] {
    return this.tags$.getValue()
  }

  clearSelectedTags(): void {
    this.selectedTags$.next([])
    this.isNoTagSelected$.next(false)
  }

  updateSelectedTags(checkboxProps: ICheckbox): void {
    if (checkboxProps.checked && checkboxProps.value !== 'noTags')
      this.selectedTags$.next([...this.selectedTags$.getValue(), checkboxProps.value])
    else if (checkboxProps.checked && checkboxProps.value === 'noTags')
      this.isNoTagSelected$.next(true)
    else if (!checkboxProps.checked && checkboxProps.value === 'noTags')
      this.isNoTagSelected$.next(false)
    else
      this.selectedTags$.next(this.selectedTags$.getValue().filter(tagName => tagName !== checkboxProps.value))
  }

  findTagByName(tagName: string): ITag {
    return this.tags$.getValue().find(tag => tag.name === tagName) as ITag
  }

  generateTagId(): number {
    return this.tags$.getValue().length + 1
  }

  getIfTagSelected(tagName: string): boolean {
    return this.selectedTags.includes(tagName)
  }

  addTag(tag: ITag): void {
    this.tags$.next([...this.tags$.getValue(), tag])
  }

  removeTagById(tagId: number): void {
    const tag = this.findTagById(tagId)
    if (this.selectedTags$.getValue().includes(tag.name))
      this.selectedTags$.next(this.selectedTags$.getValue().filter(tagName => tagName !== tag.name))

    this.tags$.next(this.tags$.getValue().filter(tag => tag.id !== tagId))
  }

  private findTagById(tagId: number): ITag {
    return this.tags$.getValue().find(tag => tag.id === tagId) as ITag
  }
}
