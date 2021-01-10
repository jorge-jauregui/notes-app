import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss']
})
export class NotesCreateComponent implements OnInit {

  @Output() noteCreated = new EventEmitter();

  enteredTitle = '';
  enteredDescription = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddNote() {
    const note = {
      title: this.enteredTitle,
      description: this.enteredDescription
    }
    this.noteCreated.emit(note);
  }

}
