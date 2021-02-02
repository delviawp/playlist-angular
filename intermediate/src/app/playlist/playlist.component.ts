import { AddComponent } from './add/add.component';
import { Playlist, PlaylistC } from './intermediate-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  lists!: Playlist[]

  constructor(public songs: PlaylistC) { }

  ngOnInit(): void {
    this.lists = this.songs.playlists
  }
}
