import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { firstValueFrom } from 'rxjs';
import { SwalService } from '../../../_shared/services/swal.service';
import { setUser } from '../../../_store/user/user.actions';
import { IUserProfile } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  showPassword: boolean = false;
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private permissionsService: NgxPermissionsService,
    private route: Router,
    private authService: AuthService,
    private store: Store<IUserProfile>,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {}

  changePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  initForm() {
    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  access() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.login(this.loginForm.value).subscribe({
        next: async (res) => {
          localStorage.setItem('authToken', res.access_token);
          const value = await firstValueFrom(this.authService.getUserInfo());

          this.permissionsService.loadPermissions([value.perms]);

          this.store.dispatch(setUser({ user: value }));
          this.route.navigate(['users/profil/edite']);
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;

          if (err.status == 401) {
            this.swalService.error.fire('Login ou senha incorretos!');
            return;
          }

          this.swalService.error.fire(err.error.message);
        },
      });
    } else {
      this.swalService.warning.fire('Aviso', 'Há campos a serem preenchidos!');
    }
  }
}
