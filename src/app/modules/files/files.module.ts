import { NgModule } from '@angular/core';
import { SharedModule } from '../../_shared/shared.module';
import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files.component';
import { ListFilesComponent } from './pages/list-files/list-files.component';
import { RegisterFilesComponent } from './pages/register-files/register-files.component';

@NgModule({
  imports: [SharedModule, FilesRoutingModule],
  declarations: [FilesComponent, ListFilesComponent, RegisterFilesComponent],
})
export class FilesModule {}
