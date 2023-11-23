import TAGS from './tags'
import {Product} from '../product.model'
import {IProduct} from '../interfaces/interfaces'

const PRODUCTS: IProduct[] = [
  new Product('meal', 150, [], 'cool meal'),
  new Product('apple', 30, [TAGS[0]], 'tasty apple'),
  new Product('soup', 85, [TAGS[1], TAGS[2]], 'yummy soup'),
]

export default PRODUCTS
