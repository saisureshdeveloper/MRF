import { Directive, HostBinding, HostListener, ElementRef, Renderer, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appExpandMenu]'
})
export class ExpandMenuDirective {

  constructor( private e:ElementRef,private renderer:Renderer2) {
    console.log("workinf exapnd")
   }
   @HostBinding('class.card-outline-primary')private ishovering: boolean;

  @HostBinding('class.active') isOpen = false;
@HostListener('click') toggleOpen($event){
this.isOpen = !this.isOpen;
this.renderer.setStyle(this.e.nativeElement, 'display',
'block');

}
@HostListener('mouseover') onMouseOver() {
  // window.alert("message");
  // console.log("mouseover")
  // let part = this.e.nativeElement.querySelector('.card-text');
  // this.renderer.setElementStyle(this.e.nativeElement.querySelector('.card-text'), 'display', 'block');
  // // this.ishovering = true;
}

@HostListener('mouseout') onMouseOut() {
  // console.log("mouseout")

  // let part = this.e.nativeElement.querySelector('.card-text');
  // this.renderer.setElementStyle(part, 'display', 'none');
  // this.ishovering = false;
}
}


