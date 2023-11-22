import {v4} from 'uuid'

export interface ITag {
  id: number,
  name: string
}

export interface IProduct {
  readonly id: string,
  name: string,
  description?: string,
  price: number,
  tags?: ITag[]
}

export class Product implements IProduct {
  readonly id: string;
  name: string;
  description?: string;
  price: number;
  tags?: ITag[]

  constructor(name: string, price: number, tags?: ITag[], description?: string) {
    this.id = v4()
    this.name = name
    this.description = description
    this.price = price
    this.tags = tags
  }
}
