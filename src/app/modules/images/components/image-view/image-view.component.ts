import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImagesRegisterComponent } from '../../pages/images-register/images-register.component';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent implements OnInit {
  imgSrc: string;

  constructor(
    private dialogRef: MatDialogRef<ImagesRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { imgPath: string }
  ) {}

  ngOnInit() {
    this.imgSrc = this.data.imgPath;
  }
}
