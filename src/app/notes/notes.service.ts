import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './note.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();

  constructor(private http: HttpClient) { }

  getNotes() {
    this.http.get<{message: string, notes: Note[]}>('http://localhost:3000/notes')
      .subscribe((noteData) => {
        this.notes = noteData.notes;
        this.notesUpdated.next([...this.notes]);
      });
  }

  getNoteUpdateListener() {
    return this.notesUpdated.asObservable();
  }

  addNote(title: string, description: string) {
    const note: Note = {
      id: null,
      title: title,
      description: description
    };
    this.http.post<{message: string}>('http://localhost:3000/notes', note)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.notes.push(note);
        this.notesUpdated.next([...this.notes]);
      });
  }
}
