import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwalService } from '../../../../_shared/services/swal.service';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.scss'],
})
export class ProductRegisterComponent implements OnInit {
  registerProductForm: FormGroup;
  product: IProduct;
  productId: number;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private swalService: SwalService,
    private dialogRef: MatDialogRef<ProductRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (this.data) this.productId = this.data?.id;
  }

  goBack() {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    if (this.productId) {
      this.getProduct();
    }
    this.initForm();
  }

  initForm() {
    this.registerProductForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    });
  }

  getProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res;
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerProductForm.patchValue({ ...this.product });
  }

  sendForm() {
    if (this.productId) {
      this.updateUser();
      return;
    }
    this.registerUser();
  }

  updateUser() {
    if (this.registerProductForm.valid) {
      this.product = {
        ...this.registerProductForm.value,
      };
      this.productService
        .updateProduct(this.productId, this.product)
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
    if (this.registerProductForm.valid) {
      this.product = {
        ...this.registerProductForm.value,
      };
      this.productService.postProduct(this.product).subscribe({
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
