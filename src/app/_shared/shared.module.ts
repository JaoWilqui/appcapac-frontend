import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DynamicPipe } from './components/table/pipes/dynamic.pipe';
import { TableComponent } from './components/table/table.component';
import { InputDirective } from './directives/custom-input.directive';
import { NumberPipe } from './pipes/number.pipe';
const declarations = [
  NumberPipe,
  DynamicPipe,
  InputDirective,
  FormFieldComponent,
  TableComponent,
  PaginatorComponent,
];

const imports = [RouterModule, FormsModule, ReactiveFormsModule, CommonModule];

const providers = [InputDirective];

const materialModules = [MatIconModule, MatButtonModule, MatDividerModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports, ...materialModules],
  providers: [...providers],
  exports: [...imports, ...materialModules, ...providers, ...declarations],
})
export class SharedModule {}
