import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router'
import {IProduct, ITag} from '../product.model'
import PRODUCTS from '../mock-data/products'
import TAGS from '../mock-data/tags'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private products!: IProduct[];
  tags!: ITag[];

  filteredProducts!: IProduct[] | null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.products = PRODUCTS
    this.tags = TAGS
    this.filteredProducts = this.products
  }

  public showDetail(id: string) {
    this.router.navigate(['detail', id])
  }

  public filterProducts(tag: string) {
    if (tag === 'all')
      this.filteredProducts = this.products
    else
      this.filteredProducts = this.products.filter(product => {
        if (product.tags) {
          const names: string[] = product.tags.map(tag => tag.name)
          if (names.includes(tag))
            return product
        }
        return
      })
  }
}
