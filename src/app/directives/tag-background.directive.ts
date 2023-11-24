import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appTagBackground]',
  standalone: true
})
export class TagBackgroundDirective implements OnInit{

  @Input() appTagBackground!: string

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.highlight(this.appTagBackground)
    }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color
  }
}
