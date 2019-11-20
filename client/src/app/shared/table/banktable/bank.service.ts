import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class BankService {

  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() remove: EventEmitter<boolean> = new EventEmitter();


//   toggle() {
//     this.isOpen = !this.isOpen;
//     this.change.emit(this.isOpen);
//   }

  AddasSelectedElement(dt)
  {
    this.change.emit(dt);
  }
  RemoveSeletedElement()
  {
    this.remove.emit();
  }

}