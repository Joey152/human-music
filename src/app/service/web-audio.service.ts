import { Injectable } from '@angular/core';

declare var AudioContext, webkitAudioContext: any;

@Injectable()
export class WebAudioService { 

  audioContext: AudioContext;
  oscillators: OscillatorNode[];
  frequency: number;

  constructor() {
    this.audioContext = new AudioContext();
    this.oscillators = [];
  }

  play(n: number): void {
    this.frequency = this.note(n);

    let oscillator = this.audioContext.createOscillator();
    oscillator.connect(this.audioContext.destination);
    oscillator.frequency.value = this.frequency;
    oscillator.type = 'sine';
    oscillator.start();

    this.oscillators.push(oscillator);
  }

  playFrequency(n: number): void {
    let oscillator = this.audioContext.createOscillator();
    oscillator.connect(this.audioContext.destination);
    oscillator.frequency.value = n;
    oscillator.type = 'sine';
    oscillator.start();

    this.oscillators.push(oscillator);
  }

  playChord(n: number, chord: string) {
    switch(chord) {
      case "single":
        this.play(n);
        break;
      case "majorTriad":
        this.play(n);
        this.playFrequency(this.note(n)*5/4);
        this.playFrequency(this.note(n)*3/2);
        break;
      case "minorTriad":
        this.play(n);
        this.playFrequency(this.note(n)*6/5);
        this.playFrequency(this.note(n)*3/2);
        break;
      default:
        this.play(n);
    }
  }

  stop() {
    if (this.oscillators != null && this.oscillators.length > 0) {
      this.oscillators.map(o => o.stop());
    }
  }

  private note(n: number) {
    return 440*(Math.pow(2,n/12));
  }
}
