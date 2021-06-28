import { Component, OnInit } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'here-we-go';
  target: any;
  scroll = new LocomotiveScroll();

  ngOnInit(): void {
    // selecting our body component by it's ID
    this.target = document.querySelector('#app-body');
    // adding scroll smoothness to our app
    new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    });
  }

  // after getting the callback from the lottie scroll animation we perform a scroll to our body
  letScroll(animationItem: AnimationItem): void {
    this.scroll.scrollTo(this.target);
  }
}
