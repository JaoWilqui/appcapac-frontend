import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SwalService } from '../../../../_shared/services/swal.service';
import { getUser } from '../../../../_store/user/user.actions';
import { IUserProfile } from '../../../../auth/models/auth.model';
import { UsersService } from '../../services/users.service';
import { changePasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  showPassword: boolean = true;
  user: IUserProfile;

  showConfirmPassword: boolean = true;
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private usersService: UsersService,
    private swalService: SwalService
  ) {
    this.store.select(getUser).subscribe((value) => {
      this.user = value.user;
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    this.passwordForm.setValidators(changePasswordValidator());
  }

  changePassword() {
    if (this.passwordForm.errors['matchPassword']) {
      const control = (param: string) => this.passwordForm.controls[param];
      this.usersService
        .changePassword(this.user.id, {
          newPassword: control('newPassword').value,
          confirmPassword: control('confirmPassword').value,
        })
        .subscribe({
          next: (res) => {
            this.swalService.success
              .fire('Sucesso!', res.message)
              .then(async () => {
                this.passwordForm.reset();
              });
          },
          error: (error: HttpErrorResponse) => {
            this.swalService.error
              .fire('Erro', error.error.message)
              .then(() => {});
          },
        });
    } else {
      this.swalService.warning.fire(
        'Aviso!',
        'Os valores devem estar preenchidos e coincidir!'
      );
    }
  }
}
