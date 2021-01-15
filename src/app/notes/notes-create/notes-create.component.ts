import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { NotesService } from '../notes.service';

import { Note } from '../note.model';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss']
})
export class NotesCreateComponent implements OnInit {

  enteredTitle = '';
  enteredDescription = '';

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
  }

  onAddNote(form: NgForm) {
    if(form.invalid){
      return;
    };
    const note: Note = {
      title: form.value.title,
      description: form.value.description
    }
    this.notesService.addNote(note.title, note.description);
    form.resetForm();
  };

}
