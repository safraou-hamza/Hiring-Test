import { AnimationItem } from 'lottie-web';
import { Component, OnInit, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) {}

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  ngOnInit(): void {}

  complete(welcomeAnimation: AnimationItem): void {
    this.ngZone.runOutsideAngular(() => {
      this.animationItem.play();
    });
  }
}
