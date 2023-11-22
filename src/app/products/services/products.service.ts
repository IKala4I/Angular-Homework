import {Injectable} from '@angular/core';
import {TagsService} from './tags.service'
import {IProduct, ITag} from '../product.model'
import PRODUCTS from '../mock-data/products'
import {ICheckbox} from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products: IProduct[]
  private filteredProducts: IProduct[]
  private noTagsProducts: IProduct[]

  constructor(private tagService: TagsService) {
    console.log('Product Service constructor')
    this._products = PRODUCTS
    this.filteredProducts = this._products.filter(product => product.tags)
    this.noTagsProducts = this._products.filter(product => !product.tags)
  }

  getAllProducts(): IProduct[] {
    return this._products
  }

  getProductsFilteredByTags(checked: boolean): IProduct[] {
    if (checked) {
      this.filteredProducts = this.filterByTags(this.filteredProducts as IProduct[])
    } else {
      if (this.tagService.selectedTags.length) {
        const productsWithTags = this._products.filter(product => product.tags)
        this.filteredProducts = this.filterByTags(productsWithTags)
      } else {
        this.filteredProducts = this._products.filter(product => product.tags)
        return this._products
      }
    }
    return this.filteredProducts
  }

  getFilteredProducts(): IProduct[] {
    return this.filteredProducts
  }

  getNoTagsProducts(): IProduct[] {
    return this.noTagsProducts
  }

  private filterByTags(products: IProduct[]): IProduct[] {
    return products.filter(product => {
        const productTags = product.tags as ITag[]
        const names: string[] = productTags.map(tag => tag.name)
        let isContainAllTags = true
        this.tagService.selectedTags.every(tag => {
          if (!names.includes(tag)) {
            isContainAllTags = false
            return false
          }
          return true
        })
        if (isContainAllTags)
          return product
        return
      }
    )
  }

  updateSelectedTags(checkboxProps: ICheckbox) {
    this.tagService.updateSelectedTags(checkboxProps)
  }

  deleteProduct(productId: string) {
    const deletedProduct = this._products.find(product => product.id === productId) as IProduct

    this._products = this._products.filter(product => product.id !== productId)
    if (deletedProduct.tags)
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId)
    else
      this.noTagsProducts = this.noTagsProducts.filter(product => product.id !== productId)
  }

  findProductById(productId: string | null): IProduct | undefined {
    if (productId)
      return this._products.find(product => product.id === productId)
    return undefined
  }

  addProduct(product: IProduct) {
    this._products = [...this._products, product]
    if (product.tags.length)
      this.filteredProducts = [...this.filteredProducts, product]
    else
      this.noTagsProducts = [...this.noTagsProducts, product]
  }
}
