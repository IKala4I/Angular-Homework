import {Injectable} from '@angular/core';
import {TagService} from './tag.service'
import PRODUCTS from '../mock-data/products'
import {ICheckbox, IProduct, ITag} from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products: IProduct[]
  private filteredProducts: IProduct[]
  private noTagProducts: IProduct[]

  constructor(private tagService: TagService) {
    this._products = PRODUCTS
    this.filteredProducts = this._products.filter(product => product.tags.length)
    this.noTagProducts = this._products.filter(product => !product.tags.length)
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

  getNoTagProducts(): IProduct[] {
    return this.noTagProducts
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

  removeProduct(productId: string): IProduct[] {
    const removedProduct = this._products.find(product => product.id === productId) as IProduct

    this._products = this._products.filter(product => product.id !== productId)
    if (removedProduct.tags)
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId)
    else
      this.noTagProducts = this.noTagProducts.filter(product => product.id !== productId)

    return this._products
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
      this.noTagProducts = [...this.noTagProducts, product]
  }

  updateProducts() {
    this.filteredProducts = this._products.filter(product => product.tags.length)
    this.noTagProducts = this._products.filter(product => !product.tags.length)
  }
}
