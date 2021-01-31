import { Injectable } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotesService } from './notes/notes.service';


@Injectable({
  providedIn: 'root'
})
export class RouteMonitorService {

  constructor(public notesService: NotesService,
    public route: ActivatedRoute) { }

  monitorRoute(note, mode, noteId) {
    this.route.firstChild.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('noteId')) {
        mode = 'edit';
        noteId = paramMap.get('noteId');
        this.notesService.getNote(noteId).subscribe((noteData) => {
          note = {
            id: noteData._id,
            title: noteData.title,
            description: noteData.description
          }
        });
      } else {
        mode = 'create';
        noteId = null;
      }
    });
  }

}
