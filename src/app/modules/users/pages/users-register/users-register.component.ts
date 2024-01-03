import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../_shared/models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.scss'],
})
export class UsersRegisterComponent implements OnInit {
  registerUserForm: FormGroup;
  user: User;
  selectedModules: number[] = [];
  modules = [
    { id: 1, label: 'Imagens', icon: 'crop_original' },
    { id: 2, label: 'Arquivos', icon: 'description' },
    { id: 3, label: 'Videos', icon: 'movie' },
  ];
  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerUserForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      perms: ['', [Validators.required]],
      email: ['', [Validators.required]],
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
    console.log(this.selectedModules);
  }

  registerUsers() {
    this.user = {
      ...this.registerUserForm.value,
      modules: this.selectedModules,
    };
    this.usersService.postUsers(this.user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
