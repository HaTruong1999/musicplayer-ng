import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { Song } from 'src/app/_models/song';
import { SongService } from 'src/app/_services/song.service';

@Component({
  selector: 'app-control-player',
  templateUrl: './control-player.component.html',
  styleUrls: ['./control-player.component.sass']
})
export class ControlPlayerComponent implements OnInit {
  @ViewChild('audio') audio?: ElementRef;
  @ViewChild('progressBar') progressbard?: ElementRef;
  @ViewChild('btnVolume') btnVolume?: ElementRef;
  @ViewChild('volumeBarValue') volumeBarValue?: ElementRef;
  @ViewChild('volumeBar') volumeBar?: ElementRef;
  @ViewChild('volumeIcon') volumeIcon?: ElementRef;

  selectedSong?: Song;
  isPlaying: boolean = false;
  isRepeat: boolean = false;
  isRandom: boolean = false;
  progress: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  progressWidth: number = 0;

  constructor(
    private songService: SongService
  ) {
    this.songService.getSelectedSong?.subscribe(
      (song) => {
        this.selectedSong = song;
        this.progress.next(0);
        // this.player?.reset();
        this.isPlaying = false;
      },
      (error) => console.error(error.message)
    );
  }

  ngOnInit(): void {
    this.isRepeat = localStorage.getItem('isRepeat') === "true" ? true : false;
    this.isRandom = localStorage.getItem('isRandom') === "true" ? true : false;
  }

  onPlay(): void {
    const AUDIOEL = this.audio?.nativeElement;

    if (this.isPlaying) {
      AUDIOEL.pause();
      // this.player?.pause();
    }
    else {
      AUDIOEL.play();
      // this.player?.play();
    }

    this.isPlaying = !this.isPlaying;
  }

  onTimeUpdate(): void {
    const AUDIOEL = this.audio?.nativeElement;

    if (AUDIOEL.duration) {
      this.progress.next(
        Math.floor((AUDIOEL.currentTime / AUDIOEL.duration) * 100)
      );
    }

    if (this.progress.value === 100) {
      if (this.isRepeat) {
        this.selectedSong = this.selectedSong;
        AUDIOEL.play();
        // this.player?.play();
      } else {
        this.songService.nextSong(this.selectedSong?.id as number, this.isRandom);
      }
    }
  }

  onChangeProgress(event: Event): void {
    const AUDIOEL = this.audio?.nativeElement,
      TARGET = event.target as HTMLInputElement;

    AUDIOEL.currentTime = (AUDIOEL.duration / 100) * Number(TARGET.value);

    this.progress.next(
      Math.floor((AUDIOEL.currentTime / AUDIOEL.duration) * 100)
    );
  }

  onNextSong(): void {
    this.songService.nextSong(this.selectedSong?.id as number, this.isRandom);
  }

  onPrevSong(): void {
    this.songService.prevSong(this.selectedSong?.id as number, this.isRandom);
  }

  onMouseOverBtnVolume(): void {
    const VOLUME_BAR_VALUE_EL = this.volumeBarValue?.nativeElement;
    const VOLUME_BAR_EL = this.volumeBar?.nativeElement;
    const VOLUME_ICON_EL = this.volumeIcon?.nativeElement;
    VOLUME_BAR_VALUE_EL.style.display = 'block';
    VOLUME_BAR_EL.style.display = 'block';
    VOLUME_ICON_EL.style.color = '#ec1f55';
  }

  onMouseOutBtnVolume(): void {
    const VOLUME_BAR_VALUE_EL = this.volumeBarValue?.nativeElement;
    const VOLUME_BAR_EL = this.volumeBar?.nativeElement;
    const VOLUME_ICON_EL = this.volumeIcon?.nativeElement;
    VOLUME_BAR_VALUE_EL.style.display = 'none';
    VOLUME_BAR_EL.style.display = 'none';
    VOLUME_ICON_EL.style.color = '#333';
  }

  onChangeVolume(event: Event): void {
    const VOLUME_BAR_VALUE_EL = this.volumeBarValue?.nativeElement;
    const VOLUME_BAR_EL = this.volumeBar?.nativeElement;
    const AUDIOEL = this.audio?.nativeElement,
      TARGET = event.target as HTMLInputElement;

    AUDIOEL.volume = VOLUME_BAR_EL.value / 100;
    VOLUME_BAR_VALUE_EL.style.width = Math.floor(VOLUME_BAR_EL.clientWidth * VOLUME_BAR_EL.value / 100) + "px"
  }

  onRepeat(): void {
    this.isRepeat = !this.isRepeat;
    localStorage.setItem("isRepeat", String(this.isRepeat));
  }

  onRandomSong(): void {
    this.isRandom = !this.isRandom;
    localStorage.setItem("isRandom", String(this.isRandom));
  }

}
