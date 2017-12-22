import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hm-sound-button',
  templateUrl: './sound-button.component.html',
  styleUrls: ['./sound-button.component.css']
})
export class SoundButtonComponent implements OnInit {

  readonly notes = ['A', '', 'B', 'C', '', 'D', '', 'E', 'F', '', 'G', ''];

  @Input() pressed: boolean;
  @Input()
  set frequency(f: number) {
    const i = this.mod(Math.round(Math.log2(f/440) * 12), 12);
    this.label = this.notes[i];
  }

  label: string

  constructor() { }

  ngOnInit() {
    
  }

  // TODO: move
  mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }
}
