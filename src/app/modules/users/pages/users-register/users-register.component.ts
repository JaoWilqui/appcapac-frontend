import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../../../../_shared/models/user.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.scss'],
})
export class UsersRegisterComponent implements OnInit {
  registerUserForm: FormGroup;
  user: User;
  userId: number = null;
  selectedModules: number[] = [];
  modules = [
    { id: 1, label: 'Imagens', icon: 'crop_original', active: false },
    { id: 2, label: 'Videos', icon: 'movie', active: false },
    { id: 3, label: 'Arquivos', icon: 'description', active: false },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private swalService: SwalService,
    public dialogRef: MatDialogRef<UsersRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (this.data) this.userId = this.data?.id;
  }

  ngOnInit() {
    if (this.userId) {
      this.getUser();
    }
    this.initForm();
  }

  goBack() {
    this.dialogRef.close(true);
  }
  initForm() {
    this.registerUserForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      perms: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    if (this.userId) {
      this.registerUserForm.controls['senha'].removeValidators([
        Validators.required,
      ]);
      this.registerUserForm.updateValueAndValidity();
    }
  }

  getUser() {
    this.usersService.getUserById(this.userId).subscribe({
      next: (res) => {
        this.user = res;
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerUserForm.patchValue({ ...this.user });

    this.user.modules.forEach((module) => {
      this.modules.forEach((moduleCheck) => {
        if (module.id == moduleCheck.id) {
          moduleCheck.active = true;
        }
      });
      this.selectedModules.push(module.id);
    });
  }

  moduleSelected(checked: boolean, moduleId: number) {
    if (checked) {
      this.selectedModules.push(moduleId);
    } else {
      const index = this.selectedModules.findIndex(
        (value) => value === moduleId
      );
      this.selectedModules.splice(index, 1);
    }
    this.selectedModules.sort((a, b) => {
      return a - b;
    });
  }

  sendForm() {
    if (this.userId) {
      this.updateUser();
      return;
    }
    this.registerUser();
  }

  updateUser() {
    if (this.registerUserForm.valid && this.selectedModules.length > 0) {
      this.user = {
        ...this.registerUserForm.value,
        modules: this.selectedModules,
      };
      this.usersService.updateUser(this.userId, this.user).subscribe({
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
    } else if (this.registerUserForm.invalid) {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    } else if (
      this.registerUserForm.valid &&
      this.selectedModules.length == 0
    ) {
      this.swalService.warning.fire(
        'Aviso!',
        'Selecione ao menos 1 módulo para atualizar o usuário'
      );
    }
  }

  registerUser() {
    if (this.registerUserForm.valid && this.selectedModules.length > 0) {
      this.user = {
        ...this.registerUserForm.value,
        modules: this.selectedModules,
      };
      this.usersService.postUsers(this.user).subscribe({
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
    } else if (this.registerUserForm.invalid) {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    } else if (
      this.registerUserForm.valid &&
      this.selectedModules.length == 0
    ) {
      this.swalService.warning.fire(
        'Aviso!',
        'Selecione ao menos 1 módulo para registrar o usuário'
      );
    }
  }
}
