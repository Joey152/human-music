import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hm-sound-button',
  templateUrl: './sound-button.component.html',
  styleUrls: ['./sound-button.component.css']
})
export class SoundButtonComponent implements OnInit {

  @Input() offsetA: number;
  label: string

  constructor() { }

  ngOnInit() {
    this.label = String.fromCharCode('A'.charCodeAt(0) + this.offsetA % 7);
  }
}
