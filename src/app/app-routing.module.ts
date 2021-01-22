import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesComponent } from './notes/notes/notes.component';
import { NotesCreateComponent } from './notes/notes-create/notes-create.component';


const routes: Routes = [
  { path: '', component: NotesComponent,
    children: [
      { path: 'create', component: NotesCreateComponent },
      { path: 'edit/:noteId', component: NotesCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
