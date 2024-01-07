import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BackBtnComponent } from './components/back-btn/back-btn/back-btn.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
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
  FormFieldComponent,
  TableComponent,
  PaginatorComponent,
  SafePipe,
];

const imports = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MatProgressBarModule,
  NgxPermissionsModule,
];

const providers = [InputDirective, SafePipe];

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
  providers: [...providers],
  exports: [...imports, ...materialModules, ...providers, ...declarations],
})
export class SharedModule {}
