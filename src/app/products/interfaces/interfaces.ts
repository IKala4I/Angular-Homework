export interface ICheckbox {
  value: string,
  checked: boolean
}

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
  removeTagById: (tagId: number) => void,
}
