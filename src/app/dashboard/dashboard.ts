import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  videoUrl: string = 'http://192.168.1.109:8082/chat/stream/video';

  duration: number = 0;
  currentTime: number = 0;

  onLoadedMetadata(video: HTMLVideoElement) {
    this.duration = video.duration;
  }

  onTimeUpdate(video: HTMLVideoElement) {
    this.currentTime = video.currentTime;
  }

  formatTime(seconds: number): string {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  playFromTime(video: HTMLVideoElement, seconds: number) {
    video.currentTime = seconds;
    video.play();
  }
isLoaded = false;

loadVideo() {
  this.videoUrl = 'http://192.168.1.109:8082/chat/stream/video';
  this.isLoaded = true;
}

}