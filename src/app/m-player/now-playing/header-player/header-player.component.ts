import { animate, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { fromEvent } from 'rxjs';
import { Song } from 'src/app/_models/song';
import { SongService } from 'src/app/_services/song.service';

@Component({
  selector: 'app-header-player',
  templateUrl: './header-player.component.html',
  styleUrls: ['./header-player.component.sass']
})
export class HeaderPlayerComponent implements OnInit {
  @ViewChild('vinyl') vinyl?: ElementRef;
  @ViewChild('cd') cd?: ElementRef;

  selectedSong?: Song;
  isPlaying: boolean = false;
  player?: AnimationPlayer;

  constructor(
    private songService: SongService,
    private builder: AnimationBuilder
  ) {
    this.songService.getSelectedSong?.subscribe(
      (song) => {
        this.selectedSong = song;
        this.player?.reset();
        this.isPlaying = false;
      },
      (error) => console.error(error.message)
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const CD_EL = this.cd?.nativeElement;
    const cdWidth = CD_EL.offsetWidth;
    let self = this;

    this.player = this.builder
      .build([animate(10000, style({
        transform: 'rotate(360deg)',
      }))])
      .create(this.vinyl?.nativeElement);//chain function call

    this.player.onDone(onDone);

    function onDone() {
      self.player?.reset();
      self.player?.play();
      self.player?.onDone(onDone);
    }

    fromEvent(window, 'scroll').subscribe(e => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      CD_EL.style.opacity = newCdWidth / cdWidth;
      CD_EL.style.width = newCdWidth > 0 ? newCdWidth + "px" : cdWidth;
    });

    if (this.isPlaying)
      this.player?.play();
    else
      this.player?.pause();
  }
}
