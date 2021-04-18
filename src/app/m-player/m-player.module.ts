import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PlayerRoutingRoutingModule } from './player-routing-routing.module';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { MPlayerComponent } from './player.component';
import { ControlPlayerComponent } from './now-playing/control-player/control-player.component';
import { BtnVolumeComponent } from './now-playing/control-player/btn-volume/btn-volume.component';
import { HeaderPlayerComponent } from './now-playing/header-player/header-player.component';



@NgModule({
  declarations: [
    MPlayerComponent,
    NowPlayingComponent,
    PlaylistComponent,
    ControlPlayerComponent,
    BtnVolumeComponent,
    HeaderPlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingRoutingModule
  ],
  bootstrap: [MPlayerComponent]
})
export class MPlayerModule { }
