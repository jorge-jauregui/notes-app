import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedNotes = [];

  onNoteAdded(note){
    this.storedNotes.push(note);
  }
}
