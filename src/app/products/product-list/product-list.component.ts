import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  constructor(private router:Router) {
  }
  public showDetail(){
    this.router.navigate(['detail'])
  }
}
