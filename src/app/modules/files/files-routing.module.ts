import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files.component';
import { ListFilesComponent } from './pages/list-files/list-files.component';
import { RegisterFilesComponent } from './pages/register-files/register-files.component';

const routes: Routes = [
  {
    path: '',
    component: FilesComponent,
    children: [
      { path: '', component: ListFilesComponent },
      { path: 'register', component: RegisterFilesComponent },
      { path: 'edit/:id', component: RegisterFilesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
