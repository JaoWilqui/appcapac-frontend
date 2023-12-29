import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  registration() {
    console.log('cadastrar');
  }

  access() {
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res.access_token);
        localStorage.setItem('authToken', res.access_token);
        this.getUserData();
        this.route.navigate(['dashboard']);
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
    this.authService.getUserInfo().subscribe({
      next: (res) => {
        this.store.dispatch(setUser({ user: res }));
      },
    });
  }
}
