import { AnimationItem } from 'lottie-web';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private animationItem: AnimationItem;

  // throught this output we inform the parent component ( body component ) that the scroll event is called.
  @Output() animationClick = new EventEmitter();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  // once the animation is created we can select it.
  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  // this methode gets fired once the lottie welcome animation is done.
  complete(welcomeAnimation: AnimationItem): void {
    // selecting the lottie scroll animation
    var element = document.getElementById('scrollBtn');

    // added the css class to the lottie scroll animation here to not get the cursor on a pointer style
    // while our lottie scroll animation is still at the 0 frame.
    element.classList.add('scrollBtn');

    // after the completion of the welcome animation we start the lottie scroll animation.
    this.ngZone.runOutsideAngular(() => {
      this.animationItem.play();
    });
  }

  // here we emited the function and passed the animationItem related to this action.
  scroll(animationItem: AnimationItem): void {
    this.animationClick.emit(animationItem);
  }
}
