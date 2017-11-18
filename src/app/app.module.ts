import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SoundButtonComponent } from './component/sound-button/sound-button.component';
import { PianoComponent } from './component/piano/piano.component';
import { SoundDialComponent } from 'app/component/sound-dial/sound-dial.component';

@NgModule({
  declarations: [
    AppComponent,
    SoundButtonComponent,
    PianoComponent,
    SoundDialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
