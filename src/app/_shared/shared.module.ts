import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { InputDirective } from './directives/custom-input.directive';
const declarations = [InputDirective, FormFieldComponent];

const imports = [RouterModule, FormsModule, ReactiveFormsModule, CommonModule];

const providers = [InputDirective];

const materialModules = [MatIconModule];

@NgModule({
  declarations: [...declarations],
  imports: [...imports, ...materialModules],
  providers: [...providers],
  exports: [...imports, ...materialModules, ...providers, ...declarations],
})
export class SharedModule {}
