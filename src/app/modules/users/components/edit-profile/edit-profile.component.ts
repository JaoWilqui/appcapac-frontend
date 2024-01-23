import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { User } from '../../../../_shared/models/user.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { setUser } from '../../../../_store/user/user.actions';
import { getUserState } from '../../../../_store/user/user.selector';
import { IUserProfile } from '../../../../auth/models/auth.model';
import { AuthService } from '../../../../auth/services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: IUserProfile;
  userSendObject: User;
  registerUserForm: FormGroup;
  selectedModules: number[] = [];
  modules = [
    { id: 1, label: 'Imagens', icon: 'crop_original', active: false },
    { id: 2, label: 'Videos', icon: 'movie', active: false },
    { id: 3, label: 'Arquivos', icon: 'description', active: false },
  ];
  constructor(
    private store: Store<any>,
    private usersService: UsersService,
    private fb: FormBuilder,
    private authService: AuthService,
    private swalService: SwalService
  ) {
    this.store.select(getUserState).subscribe((user) => {
      this.user = user;
    });
  }
  ngOnInit() {
    this.initForm();
    this.populateForms();
  }
  initForm() {
    this.registerUserForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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

  updateUser() {
    if (this.registerUserForm.valid && this.selectedModules.length > 0) {
      this.userSendObject = {
        ...this.registerUserForm.value,
        modules: this.selectedModules,
      };
      this.usersService
        .updateUser(this.user.id, this.userSendObject)
        .subscribe({
          next: (res) => {
            this.swalService.success
              .fire('Sucesso!', res.message)
              .then(async () => {
                const value = await firstValueFrom(
                  this.authService.getUserInfo()
                );
                this.usersService.getUserById(this.user.id);
                this.store.dispatch(setUser({ user: value }));
              });
          },
          error: (error: HttpErrorResponse) => {
            this.swalService.error
              .fire('Erro', error.error.message)
              .then(() => {});
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
}
