import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  public note: Note;
  private mode = 'create';
  private noteId: string;

  constructor(public notesService: NotesService,
              public route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // Here we listen to changes in the url and change the form data depending on the params
    this.monitorRoute();
  }

  monitorRoute(){
    this.route.firstChild.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('noteId')) {
        this.mode = 'edit';
        this.noteId = paramMap.get('noteId');
        this.notesService.getNote(this.noteId).subscribe((noteData) => {
          this.note = {
            id: noteData._id,
            title: noteData.title,
            description: noteData.description
          }
        });
      } else {
        this.mode = 'create';
        this.noteId = null;
      }
    });
  }

  onSaveNote(form: NgForm) {
    if(form.invalid){
      return;
    };
    if(this.mode === 'create') {
      this.notesService.addNote(form.value.title, form.value.description);
    } else {
      this.notesService.updateNote(this.noteId, form.value.title, form.value.description);
    }
    // form.resetForm();
  };



  onNewNote(form: NgForm) {
    this.router.navigate(['create']);
    this.mode = 'create';
    form.resetForm();
  }

}
