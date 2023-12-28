import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/entities/user.model';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {

  @Input() user: User;

  constructor(
    public dialogRef: MatDialogRef<any>
  ) {}

}
