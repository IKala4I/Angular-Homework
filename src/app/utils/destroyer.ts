import {Subject} from 'rxjs'
import {Injectable, OnDestroy} from '@angular/core'

@Injectable()
export class Destroyer implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy() {
    console.log('Destroyer on destroy')
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
