import {IProduct, Product} from '../product.model'

const PRODUCTS:IProduct[] = [
  new Product('meal', 150, undefined, 'cool meal'),
  new Product('apple', 30, [{id: 1, name: 'fruit'}], 'tasty apple'),
  new Product('soup', 85, [{id: 2, name: 'first-dish'}, {id: 3, name: 'veggie'}], 'yummy soup'),
]

export default PRODUCTS
