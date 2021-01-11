import { Component, OnDestroy, OnInit } from '@angular/core';

import { Note } from '../../note.model';
import { NotesService } from '../../notes.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  private notesSubscription: Subscription;

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getNotes();
    this.notesSubscription = this.notesService.getNoteUpdateListener()
      .subscribe((data: Note[]) => {
        this.notes = data;
      });
  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
  }

}
