import {Component, EventEmitter, Input, Output} from '@angular/core'
import {CommonModule} from '@angular/common'
import {IProduct} from '../../../interfaces/interfaces'
import {ProductCardComponent} from './product-card/product-card.component'
import {ProductService} from '../../../services/product.service'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products!: IProduct[]
  @Input() isProductInEditMode!: boolean
  @Output() isProductInEditModeChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() productRemoved: EventEmitter<string> = new EventEmitter<string>()

  constructor() {}

  removeProduct(productId: string): void {
    this.productRemoved.emit(productId)
  }

  toggleEditMode(): void {
    const state = !this.isProductInEditMode
    this.isProductInEditModeChange.emit(state)
  }
}
