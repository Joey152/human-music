import { Component, Input, ElementRef, ViewChild, HostListener } from "@angular/core";

interface Point {x: number, y: number};

@Component({
    selector: 'hm-sound-dial',
    templateUrl: 'sound-dial.component.html'
})
export class SoundDialComponent {
  
  @Input()
  radius = 100;

  @ViewChild('container')
  dialContainer: ElementRef;

  boundingX: number;
  boundingY: number;
  off: number;

  innerCircleR = 10;
  innerCircleX = this.radius;
  innerCircleY = this.innerCircleR + 5;

  railRadius = this.radius - this.innerCircleY

  constructor() { }

  ngAfterViewInit() {
    const element: HTMLElement = this.dialContainer.nativeElement;
    this.boundingX = element.offsetLeft;
    this.boundingY = element.offsetTop;
  }

  // @HostListener('document:mousemove', ['$event'])
  moveDial(event: MouseEvent) {
    // if (event.)
    const localPoint = this.toLocalPoint({x: event.pageX, y: event.pageY})
    const mappedPoint = this.mapToInnerCircle(localPoint);
    this.innerCircleX = mappedPoint.x;
    this.innerCircleY = mappedPoint.y;
  }

  toLocalPoint(point: Point): Point {
    const localX = point.x - this.boundingX;
    const localY = point.y - this.boundingY;
    return {x: localX, y: localY};
  }

  mapToInnerCircle(point: Point): Point {
    const mappedX = 2;
    const mappedY = 2;
    return {x: point.x, y: point.y}
  }
}