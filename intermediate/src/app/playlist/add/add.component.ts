import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Playlist,Song } from '../intermediate-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  secondForm!: FormGroup;
  lists: Playlist = new Playlist();
  song: Song = new Song ();
  do = false;
  duration = 0;
  constructor(private openModal: MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, { validators: [Validators.required] }),
    });
    this.secondForm = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      artist: new FormControl(null, { validators: [Validators.required] }),
      duration: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  submit() {
    if (this.form.valid && (this.secondForm.valid || this.lists.songs.length !== 0)) {
      if (this.secondForm.valid) {
          this.song = new Song ();
          this.song.title = this.secondForm.value.title;
          this.song.artist = this.secondForm.value.artist;
          this.song.duration = this.secondForm.value.duration;
          this.lists.songs.push(this.song);
        }
      this.lists.songs.forEach((e) => {
        this.duration += e.duration;
      });
      this.lists.totalDuration = this.duration;
      this.lists.name = this.form.value.name;
      this.lists.totalSongs = this.lists.songs.length;
      this.lists.description = this.form.value.description;
      this.openModal.close(this.lists);
    }
  }

  add() {
    if (this.secondForm.valid) {
    this.song = new Song ();
    this.song.title = this.secondForm.value.title;
    this.song.artist = this.secondForm.value.artist;
    this.song.duration = this.secondForm.value.duration;
    this.lists.songs.push(this.song);
    this.secondForm.reset();
    this.do = true; }
  }

  delete(sing: Song) {
    const index = this.lists.songs.findIndex((e) => e.title === sing.title);
    this.lists.songs.splice(index, 1);
  }
}
