export interface ICheckbox {
  value: string,
  checked: boolean
}

export interface ITag {
  readonly id: number,
  name: string,
  backgroundColor: string
}

export interface IProduct {
  readonly id: string,
  name: string,
  description: string,
  price: number,
  tags: ITag[],
  addTag: (tag: ITag) => void,
  removeTagByName: (tagName: string) => void
}
