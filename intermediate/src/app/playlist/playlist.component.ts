import { AddComponent } from './add/add.component';
import { Playlist, PlaylistC } from './intermediate-data';
import { MatDialog } from '@angular/material/dialog'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  lists!: Playlist[]

  constructor(public songs: PlaylistC, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.lists = this.songs.playlists
  }

  addToPlaylist() {
    const openModal = this.dialog.open(AddComponent)
    openModal.afterClosed().subscribe(result => {
      if (result ) { this.lists.push(result)}
    })
  }

  delete(eachSong: Playlist) {
    const i = this.lists.findIndex((e) => e.name === eachSong.name)
    this.lists.splice(i, 1);
  }
}
