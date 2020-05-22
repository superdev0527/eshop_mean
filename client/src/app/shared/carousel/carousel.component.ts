import { Component, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @ViewChild('slides') slides: ElementRef<HTMLDivElement>;
  @ViewChild('slideContainer') slideContainer: ElementRef<HTMLDivElement>;

  showArrowsSub$ = new BehaviorSubject(false);

  ngAfterViewInit(): void {
    of('slidesChildren').pipe(delay(200))
      .subscribe(() => {
        if (this.slides.nativeElement.children && this.slides.nativeElement.children[0]) {
          this.showArrowsSub$.next(this.slides.nativeElement.offsetWidth < (this.slides.nativeElement.children[0].clientWidth * this.slides.nativeElement.children.length));
        } else {
          this.showArrowsSub$.next(true);
        }
      })
  }

  onClickLeft() {
    this.slides.nativeElement.scrollLeft
      -= (this.slides.nativeElement.offsetWidth / this.slides.nativeElement.children.length);
  }

  onClickRight() {
    this.slides.nativeElement.scrollLeft
      += (this.slides.nativeElement.offsetWidth / this.slides.nativeElement.children.length);
  }
}
