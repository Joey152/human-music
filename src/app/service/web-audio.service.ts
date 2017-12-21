import { Injectable } from '@angular/core';

declare var AudioContext, webkitAudioContext: any;

@Injectable()
export class WebAudioService { 

  audioContext: AudioContext;
  oscillators: Map<string, OscillatorNode[]>;
  frequency: number;
  baseFrequency: number = 55;

  constructor() {
    this.audioContext = new AudioContext();
    this.oscillators = new Map();
  }

  play(n: number, id: string): void {
    this.playFrequency(this.note(n), id);
  }

  playFrequency(n: number, id: string): void {
    let oscillator = this.audioContext.createOscillator();
    oscillator.connect(this.audioContext.destination);
    oscillator.frequency.value = n;
    oscillator.type = 'square';

    oscillator.start();

    if (!this.oscillators.has(id)) this.oscillators.set(id, []);
    this.oscillators.get(id).push(oscillator);
  }

  playChord(n: number, chord: string, id: string) {
    switch(chord) {
      case "single":
        this.playFrequency(this.note(n), id);
        break;
      case "majorTriad":
        this.playFrequency(this.note(n), id);
        this.playFrequency(this.note(n)*5/4, id);
        this.playFrequency(this.note(n)*3/2, id);
        break;
      case "minorTriad":
        this.playFrequency(this.note(n), id);
        this.playFrequency(this.note(n)*6/5, id);
        this.playFrequency(this.note(n)*3/2, id);
        break;
      default:
        this.playFrequency(this.note(n), id);
    }
  }

  stop(id: string) {
    if (this.oscillators.get(id) != null && this.oscillators.get(id).length > 0) {
      this.oscillators.get(id).map(o => o.stop());
    }
  }

  private note(n: number) {
    return this.baseFrequency*(Math.pow(2,n/12));
  }
}
