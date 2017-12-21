import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';

import { WebAudioService } from '../../service/web-audio.service';

@Component({
  selector: 'hm-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css'],
  providers: [ WebAudioService ]
})
export class PianoComponent implements OnInit {

  notes: number[];
  chord = 'single';
  keyboard = ['a','w','s','e','d','r','f','t','g','y','h','u','j'];
  keyDown: Map<string, boolean> = new Map();

  constructor(private webAudioService: WebAudioService) { }

  ngOnInit() {
    this.notes = Array.from(Array(13).keys());
    this.keyboard.forEach(key => {
      this.keyDown.set(key, false);
    });
  }

  @HostListener('document:keydown', ['$event'])
  keyBindings(event: KeyboardEvent) {

    const pos = this.keyboard.indexOf(event.key);

    if (this.keyDown.has(event.key)) {
      if (!this.keyDown.get(event.key)) {
        this.keyDown.set(event.key, true);
        this.play(pos);
      }
    }
    else if (event.key === 'q') {
      this.webAudioService.baseFrequency /= 2;
    }
    else if (event.key === 'i') {
      this.webAudioService.baseFrequency *= 2;
    } 
  }

  play(note: number) {
    this.webAudioService.playChord(note, this.chord, String(note));
  }

  @HostListener('document:keyup', ['$event'])
  stop(event: KeyboardEvent) {
    if (this.keyDown.has(event.key)) {
      this.keyDown.set(event.key, false);
      this.webAudioService.stop(String(this.keyboard.indexOf(event.key)));
    }
  }

  isPressed(index: number) {
    return this.keyDown.get(this.keyboard[index])
  }

}
