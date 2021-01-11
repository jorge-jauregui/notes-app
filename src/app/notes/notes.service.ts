import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();

  constructor() { }

  getNotes() {
    return [...this.notes];
  }

  getNoteUpdateListener() {
    return this.notesUpdated.asObservable();
  }

  addNote(title: string, description: string) {
    const note: Note = {
      title: title,
      description: description
    };
    this.notes.push(note);
    this.notesUpdated.next([...this.notes]);
  }
}
