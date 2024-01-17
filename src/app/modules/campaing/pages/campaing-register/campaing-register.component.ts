import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../models/campaing.model';
import { CampaingService } from '../../services/campaing.service';

@Component({
  selector: 'app-campaing-register',
  templateUrl: './campaing-register.component.html',
  styleUrls: ['./campaing-register.component.scss'],
})
export class CampaingRegisterComponent implements OnInit {
  registerCampaingForm: FormGroup;
  campaing: ICampaing;
  campaingId: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private campaingService: CampaingService,
    private swalService: SwalService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<CampaingRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (this.data) this.campaingId = this.data?.id;
  }

  goBack() {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    if (this.campaingId) {
      this.getCampaing();
    }
    this.initForm();
  }

  initForm() {
    this.registerCampaingForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      status: ['', [Validators.required]],
      dtinicio: ['', [Validators.required]],
      dtfim: ['', [Validators.required]],
    });
  }

  getCampaing() {
    this.campaingService.getCampaingById(this.campaingId).subscribe({
      next: (res) => {
        this.campaing = res;
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerCampaingForm.patchValue({ ...this.campaing });
  }

  sendForm() {
    if (this.campaingId) {
      this.updateUser();
      return;
    }
    this.registerUser();
  }

  updateUser() {
    if (this.registerCampaingForm.valid) {
      this.campaing = {
        ...this.registerCampaingForm.value,
      };
      this.campaingService
        .updateCampaing(this.campaingId, this.campaing)
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
    if (this.registerCampaingForm.valid) {
      this.campaing = {
        ...this.registerCampaingForm.value,
      };
      this.campaingService.postCampaings(this.campaing).subscribe({
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
