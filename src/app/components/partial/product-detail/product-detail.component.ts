import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router'
import {ProductService} from '../../../services/product.service'
import {IProduct} from '../../../interfaces/interfaces'
import {TagService} from '../../../services/tag.service'
import {ProductFormComponent} from '../product-form/product-form.component'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: IProduct
  isEditMode!: Boolean

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private tagService: TagService, private router: Router) {
  }

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id')
    const foundProduct = this.productService.findProductById(id)
    if (foundProduct)
      this.product = foundProduct
    else
      this.router.navigateByUrl('/')
    this.isEditMode = false
  }

  getTagBackground(tagName: string): string {
    return this.tagService.findTagByName(tagName).backgroundColor
  }

  toggleEditForm(): void {
    this.isEditMode = !this.isEditMode
  }

  removeProduct(productId: string): void {
    this.productService.removeProduct(productId)
    this.router.navigateByUrl('/')
  }

  onSaveChanges(): void {
    this.isEditMode = false
  }
}
