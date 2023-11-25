import {Injectable} from '@angular/core';
import {TagService} from './tag.service'
import PRODUCTS from '../constants/mock-data/products'
import {ICheckbox, IProduct, ITag} from '../interfaces/interfaces'
import {BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(PRODUCTS)
  private filteredProducts$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([])

  constructor(private tagService: TagService) {
    this.updateProducts(this.products$.getValue())

    this.products$.subscribe(products => {
      this.updateProducts(products)
    })
  }

  private updateProducts(products: IProduct[]): void {
    if (this.tagService.isNoTagSelected)
      this.filteredProducts$.next(this.products$.getValue().filter(product => !product.tags.length))
    else if (this.tagService.selectedTags.length)
      this.filteredProducts$.next(this.filterByTags(this.products$.getValue()))
    else
      this.filteredProducts$.next([...products])
  }
  filterProductsByTag(checkboxProps: ICheckbox): void {
    const allProducts = this.products$.getValue()

    if (checkboxProps.value === 'noTags' && checkboxProps.checked) {
      this.filteredProducts$.next(this.products$.getValue().filter(product => !product.tags.length))
    } else if (checkboxProps.checked) {
      this.filteredProducts$.next(this.filterByTags(this.filteredProducts$.getValue()))
    } else {
      if (this.tagService.selectedTags.length) {
        const productsWithTags = allProducts.filter(product => product.tags.length)
        this.filteredProducts$.next(this.filterByTags(productsWithTags))
      } else {
        this.filteredProducts$.next(allProducts)
      }
    }
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
  resetFilteredProducts(): void {
    this.filteredProducts$.next(this.products$.getValue())
  }

  getFilteredProductsAsObservable(): Observable<IProduct[]> {
    return this.filteredProducts$
  }

  removeProduct(productId: string): void {
    const allProducts = this.products$.getValue().filter(product => product.id !== productId)

    this.products$.next(allProducts)
  }

  findProductById(productId: string | null): IProduct | undefined {
    if (productId)
      return this.products$.getValue().find(product => product.id === productId)

    return undefined
  }

  addProduct(product: IProduct): void {
    const allProducts = this.products$.getValue()
    this.products$.next([...allProducts, product])
  }

  removeTagFromProductsById(tagId: number): void {
    this.products$.next(this.products$.getValue().map(product => {
      if (product.tags.length)
        product.tags = product.tags.filter(tag => tag.id !== tagId)
      return product
    }))
  }
}
