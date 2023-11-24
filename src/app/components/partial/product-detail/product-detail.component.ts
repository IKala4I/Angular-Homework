import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router'
import {ProductService} from '../../../services/product.service'
import {IProduct} from '../../../interfaces/interfaces'
import {TagBackgroundDirective} from '../../../directives/tag-background.directive'
import {TagService} from '../../../services/tag.service'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, TagBackgroundDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product?: IProduct;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private tagService: TagService) {
  }

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id')
    this.product = this.productService.findProductById(id)
  }

  getTagBackground(tagName: string): string {
    return this.tagService.findTagByName(tagName).backgroundColor
  }
}
