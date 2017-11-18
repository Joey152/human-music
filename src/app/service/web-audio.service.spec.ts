import { TestBed, inject } from '@angular/core/testing';

import { WebAudioService } from './web-audio.service';

describe('WebAudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebAudioService]
    });
  });

  it('should be created', inject([WebAudioService], (service: WebAudioService) => {
    expect(service).toBeTruthy();
  }));
});
