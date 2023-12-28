import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../../../_shared/services/swal.service';
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
    private authService: AuthService,
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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  registration() {
    console.log('cadastrar');
  }

  access() {
    this.isLoading = true;

    let formValue = (param: string) => {
      return this.loginForm.controls[param].value;
    };

    this.authService
      .login({
        email: formValue('email'),
        password: formValue('password'),
      })
      .subscribe({
        next: (res) => {
          this.getUserData();
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;

          if (err.status == 401) {
            this.swalService.error.fire('Login ou senha incorretos!');
            return;
          }

          this.swalService.error.fire('Um erro inesperado ocorreu!');
        },
      });
  }

  getUserData() {
    this.authService.getUserInfo().subscribe();
  }
}
