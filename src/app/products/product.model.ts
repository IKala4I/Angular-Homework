import {v4} from 'uuid'
import {IProduct, ITag} from './interfaces/interfaces'
export class Product implements IProduct {
  readonly id: string;
  name: string;
  description: string;
  price: number;
  tags: ITag[]

  constructor(name: string, price: number, tags: ITag[], description: string) {
    this.id = v4()
    this.name = name
    this.description = description
    this.price = price
    this.tags = tags
  }

  addTag(tag: ITag) {
    this.tags = [...this.tags, tag]
  }

  removeTagById(tagId: number) {
    this.tags = this.tags.filter(tag => tag.id !== tagId)
  }
}
