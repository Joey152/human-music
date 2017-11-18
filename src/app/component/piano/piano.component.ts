import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { WebAudioService } from '../../service/web-audio.service';

@Component({
  selector: 'hm-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css'],
  providers: [ WebAudioService ]
})
export class PianoComponent implements OnInit {

  notes: number[];

  constructor(private webAudioService: WebAudioService) { }

  ngOnInit() {
    this.notes = Array.from(Array(13).keys());
  }

  play(note: number, chord: string) {
    this.webAudioService.playChord(note, chord);
  }

  stop() {
    this.webAudioService.stop();
  }

}
