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

  mouseDown = false;

  constructor() { }

  ngAfterViewInit() {
    const element: HTMLElement = this.dialContainer.nativeElement;
    this.boundingX = element.offsetLeft;
    this.boundingY = element.offsetTop;
  }

  @HostListener('document:mousemove', ['$event'])
  moveDial(event: MouseEvent) {
    if (this.mouseDown) {
      const localPoint = this.toLocalPoint({x: event.pageX, y: event.pageY})
      const mappedPoint = this.mapToInnerCircle(localPoint);
      this.innerCircleX = mappedPoint.x;
      this.innerCircleY = mappedPoint.y;
    }
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.mouseDown = true;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.mouseDown = false;
  }

  toLocalPoint(point: Point): Point {
    const localX = point.x - this.boundingX;
    const localY = point.y - this.boundingY;
    return {x: localX, y: localY};
  }

  // https://math.stackexchange.com/questions/127613/closest-point-on-circle-edge-from-point-outside-inside-the-circle
  mapToInnerCircle(point: Point): Point {
    const lengthX = point.x - this.radius
    const lengthY = point.y - this.radius
    const length = Math.sqrt(Math.pow(lengthX,2) + Math.pow(lengthY,2))
    const mappedX = this.radius + (this.railRadius * (lengthX / length));
    const mappedY = this.radius + (this.railRadius * (lengthY / length));
    if(length == 0) return {x: point.x, y: point.y} // whatdo
    return {x: mappedX, y: mappedY}
  }  
}