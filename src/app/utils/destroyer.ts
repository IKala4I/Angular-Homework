import {Subject} from 'rxjs'
import {Injectable, OnDestroy} from '@angular/core'

@Injectable()
export class Destroyer implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>()

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
