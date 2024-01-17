import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICategory } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.scss'],
})
export class CategoryRegisterComponent implements OnInit {
  registerCategoryForm: FormGroup;
  category: ICategory;
  categoryId: number;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private swalService: SwalService,
    private dialogRef: MatDialogRef<CategoryRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (this.data) this.categoryId = this.data?.id;
  }

  goBack() {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    if (this.categoryId) {
      this.getCategory();
    }
    this.initForm();
  }

  initForm() {
    this.registerCategoryForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    });
  }

  getCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (res) => {
        this.category = res;
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerCategoryForm.patchValue({ ...this.category });
  }

  sendForm() {
    if (this.categoryId) {
      this.updateUser();
      return;
    }
    this.registerUser();
  }

  updateUser() {
    if (this.registerCategoryForm.valid) {
      this.category = {
        ...this.registerCategoryForm.value,
      };
      this.categoryService
        .updateCategory(this.categoryId, this.category)
        .subscribe({
          next: (res) => {
            this.swalService.success.fire('Sucesso!', res.message).then(() => {
              this.goBack();
            });
          },
          error: (error: HttpErrorResponse) => {
            this.swalService.error
              .fire('Erro', error.error.message)
              .then(() => {
                this.goBack();
              });
          },
        });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }

  registerUser() {
    if (this.registerCategoryForm.valid) {
      this.category = {
        ...this.registerCategoryForm.value,
      };
      this.categoryService.postCategory(this.category).subscribe({
        next: (res) => {
          this.swalService.success.fire('Sucesso!', res.message).then(() => {
            this.goBack();
          });
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error.fire('Erro', error.error.message).then(() => {
            this.goBack();
          });
        },
      });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }
}
