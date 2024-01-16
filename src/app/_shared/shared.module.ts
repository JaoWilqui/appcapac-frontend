import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BackBtnComponent } from './components/back-btn/back-btn/back-btn.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchBtnComponent } from './components/search-btn/search-btn.component';
import { DynamicPipe } from './components/table/pipes/dynamic.pipe';
import { TableComponent } from './components/table/table.component';
import { InputDirective } from './directives/custom-input.directive';
import { NumberPipe } from './pipes/number.pipe';

import { SafePipe } from './pipes/sanitizer.pipe';

const declarations = [
  NumberPipe,
  DynamicPipe,
  InputDirective,
  BackBtnComponent,
  FilterComponent,
  FormFieldComponent,
  TableComponent,
  SearchBtnComponent,
  PaginatorComponent,
  SafePipe,
];

const imports = [
  RouterModule,
  MatDialogModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgxMaskDirective,
  NgxMaskPipe,
  MatCheckboxModule,
  MatProgressBarModule,
  NgxPermissionsModule,
];

const providers = [InputDirective, SafePipe, DatePipe];

const materialModules = [
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatSortModule,
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports, ...materialModules],
  providers: [...providers, provideNgxMask()],
  exports: [...imports, ...materialModules, ...providers, ...declarations],
})
export class SharedModule {}
