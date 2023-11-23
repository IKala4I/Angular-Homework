import {ITag} from './interfaces/interfaces'

export class Tag implements ITag {
  readonly id: number;
  name: string;
  backgroundColor: string;

  constructor(id:number, name: string, backgroundColor: string) {
    this.id = id
    this.name = name
    this.backgroundColor = backgroundColor
  }
}
