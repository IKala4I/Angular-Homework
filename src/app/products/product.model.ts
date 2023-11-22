import {v4} from 'uuid'

export interface ITag {
  id: number,
  name: string
}

export interface IProduct {
  readonly id: string,
  name: string,
  description: string,
  price: number,
  tags: ITag[],
  addTag: (tag: ITag) => void,
  removeTag: (tagName: string) => void,
}

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

  removeTag(tagName: string) {
    this.tags = this.tags.filter(tag => tag.name !== tagName)
  }
}
