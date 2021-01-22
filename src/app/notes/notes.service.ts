import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './note.model';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();

  constructor(private http: HttpClient) { }

  getNotes() {
    this.http
      .get<{message: string, notes: any}>(
        'http://localhost:3000/notes'
      )
      // Converting data received from server before using it. (Our note interface expects an id).
      .pipe(map((noteData) => {
        return noteData.notes.map(note => {
          return {
            title: note.title,
            description: note.description,
            id: note._id
          };
        });
      }))
      // Result of http.get() followed by map operation
      .subscribe((mappedNotes) => {
        this.notes = mappedNotes;
        this.notesUpdated.next([...this.notes]);
      });
  }

  getNoteUpdateListener() {
    return this.notesUpdated.asObservable();
  }

  getNote(id: string) {
    return this.http.get<{_id: string, title: string, description: string}>(
      'http://localhost:3000/notes/' + id
    );
  }

  addNote(title: string, description: string) {
    const note: Note = {
      id: null,
      title: title,
      description: description
    };
    this.http.post<{message: string, noteId: string}>('http://localhost:3000/notes', note)
      .subscribe((responseData) => {
        const id = responseData.noteId;
        note.id = id;
        this.notes.push(note);
        this.notesUpdated.next([...this.notes]);
      });
  }

  deleteNote(noteId: string) {
    this.http.delete(patch)
      .subscribe(() => {
        // Remove deleted note from client with filter() and send back a copy of updated notes
        const updatedNotes = this.notes.filter(note => note.id !== noteId);
        this.notes = updatedNotes;
        this.notesUpdated.next([...this.notes]);
      });
  }

  updateNote(id: string, title: string, description: string) {
    const note: Note = {
      id: id,
      title: title,
      description: description
    };
    this.http.patch('http://localhost:3000/notes/' + id, note)
      .subscribe((response) => {
        const updatedNotes = [...this.notes];
        const oldNoteIndex = updatedNotes.findIndex(n => n.id === note.id);
        updatedNotes[oldNoteIndex] = note;
        this.notes = updatedNotes;
        this.notesUpdated.next([...this.notes]);
      })
  }
}
