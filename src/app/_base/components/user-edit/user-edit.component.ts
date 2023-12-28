import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SwalService } from 'src/app/shared/services/swal.service';
import {
  clearBreadcrumb,
  setBreadcrumb,
} from 'src/app/store/breadcrumb/breadcrumb.action';
import { IUser, Roles } from './models/user.model';
import CustomValidators from 'src/app/shared/misc/custom-validators.validator';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { UserService } from 'src/app/shared/services/entities/user.service';
import { User } from 'src/app/shared/models/entities/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  user?: User;
  self: User;

  userId: string;

  error: string;

  visibility: boolean = false;

  userRoles = Roles;

  loading: boolean = false;

  subscription = new Subscription();

  @Input() canTypeNewPassword: boolean = false;
  @Input() disabledFields: string[] | string = [];
  @Input() backURL?: string;
  @Input() set editID(value: string) {

    if (value === this.userId) {
      return;
    }


    if (value) {
      this.userId = value;
      this.userService.getById(this.userId).subscribe({
        next: (res) => {
          this.user = res;
          this.userForm.patchValue({ ...res });
        },
      });
    }
    this.store.dispatch(
      setBreadcrumb({
        title: 'Usuarios',
        subTitle: this.userId ? 'Editar' : 'Cadastrar',
      })
    );
  }

  constructor(
    private userService: UserService,
    private store: Store<any>,
    private swalService: SwalService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }
  ngOnInit(): void {
    // this.initForm();
    this.store.select('user').subscribe(u => {
      this.self = u;
      this.initForm();
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      role: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, CustomValidators.taxId]], // Adicione o Validators.required aqui
      costCenter: [''],
      email: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]],
      telephone: ['', [Validators.required, CustomValidators.mobilePhone]],
    });

    for (const controlName in this.userForm.controls) {
      const disabled = this.disabledFields === '*' || this.disabledFields.includes(controlName) || (controlName === 'role' && this.self.role === 'MASTER');
      if (disabled) {
        this.userForm.get(controlName).disable();
      }
      else {
        this.userForm.get(controlName).enable();
      }
    }

  }

  handleSuccess(message?: string) {
    return (this.swalService.success
      .fire('Sucesso', message || 'Usuário salvo com sucesso!'))
  }

  handleError(message?: string) {
    return this.swalService.error.fire(
      'Erro',
      message || 'Ocorreu um erro ao tentar salvar o usuário!'
    );
  }

  save() {
    if (!this.userForm.valid) {
      this.swalService.warning.fire('Aviso', 'Preencha os campos corretamente!');
      return;
    }

    
    let sub: Subscription;
    if (this.userId) {
      const editUser = (args: User) => this.self?.role === 'MASTER' ? this.userService.adminUpdate(this.userId, args) : this.userService.update(this.userId, { ...args });
      sub =
        // .putUser({ id: this.userId, ...this.userForm.value })
        editUser(this.userForm.value)
        .subscribe({
          next: (res) => {
            this.handleSuccess()
              .then(() => this.voltar())
          },
          error: (err) => this.handleError(),
        });
    } else {
      sub = this.userService.create(this.userForm.value).subscribe({
        next: (res) => {
          this.handleSuccess()
            .then((value) => this.voltar());
        },
        error: (err) => this.handleError(err?.error?.message),
      });
    }
    this.subscription.add(sub);
  }

  voltar(): void {
    this.router.navigate([this.backURL || '/usuarios']);
  }

  newPassword() {
    // Chamar endpoint para gerar nova senha
    this.loading = true;
    this.userService.adminGenerateNewPassword(this.userId)
    .subscribe({
      next: () => {
        this.swalService.success.fire({
          title: 'Senha redefinida com sucesso',
          text: 'Uma nova senha foi gerada e enviada para o e-mail do usuário'
        });
        
        this.loading = false;
      },

      error: err => {
        console.error(err);
        this.swalService.error.fire({
          title: 'Um erro ocorreu',
          text: err?.error?.message || 'Não foi possível redefinir a senha',
        });

        this.loading = false;
      }
    })
  }

  typeNewPassword() {
    const dialog = this.dialog
      .open(ChangePasswordDialogComponent, {});

    dialog.afterClosed()
    .subscribe(result => {
      if (result === true) {
        this.swalService.success.fire({
          title: 'Senha alterada com sucesso'
        })
      }
    })

    dialog.componentInstance.user = this.user;

  }

  ngOnDestroy(): void {
    this.store.dispatch(clearBreadcrumb());
    this.subscription.unsubscribe();
  }
}
