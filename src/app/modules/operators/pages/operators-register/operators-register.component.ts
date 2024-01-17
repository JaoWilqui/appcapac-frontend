import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../../../_shared/services/swal.service';
import { CampaingRegisterComponent } from '../../../campaing/pages/campaing-register/campaing-register.component';
import { IOperator } from '../../models/operators.model';
import { OperatorsService } from '../../services/operators.service';

@Component({
  selector: 'app-operators-register',
  templateUrl: './operators-register.component.html',
  styleUrls: ['./operators-register.component.scss'],
})
export class OperatorsRegisterComponent implements OnInit {
  registerOperatorForm: FormGroup;
  operator: IOperator;
  operatorId: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private operatorService: OperatorsService,
    private swalService: SwalService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<CampaingRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (this.data) this.operatorId = this.data?.id;
  }

  goBack() {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    if (this.operatorId) {
      this.getOperator();
    }
    this.initForm();
  }

  initForm() {
    this.registerOperatorForm = this.fb.group({
      nome: ['', [Validators.required]],
    });
  }

  getOperator() {
    this.operatorService.getOperatorById(this.operatorId).subscribe({
      next: (res) => {
        this.operator = res;
        console.log(res);
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerOperatorForm.patchValue({ ...this.operator });
  }

  sendForm() {
    if (this.operatorId) {
      this.updateUser();
      return;
    }
    this.registerUser();
  }

  updateUser() {
    if (this.registerOperatorForm.valid) {
      this.operator = {
        ...this.registerOperatorForm.value,
      };
      this.operatorService
        .updateOperator(this.operatorId, this.operator)
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
    if (this.registerOperatorForm.valid) {
      this.operator = {
        ...this.registerOperatorForm.value,
      };
      this.operatorService.postOperator(this.operator).subscribe({
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
