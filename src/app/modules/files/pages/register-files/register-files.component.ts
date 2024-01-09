import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../../campaing/models/campaing.model';
import { CampaingService } from '../../../campaing/services/campaing.service';
import { ICategory } from '../../../category/models/category.model';
import { CategoryService } from '../../../category/services/category.service';
import { IFiles } from '../../models/files.model';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-register-files',
  templateUrl: './register-files.component.html',
  styleUrls: ['./register-files.component.scss'],
})
export class RegisterFilesComponent implements OnInit {
  registerFileForm: FormGroup;
  fileId: number;

  file: IFiles;

  uploadedFile: File;

  campaings: ICampaing[] = [];

  categories: ICategory[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private filesService: FilesService,
    private categoryService: CategoryService,
    private campaingService: CampaingService,

    private swalService: SwalService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.fileId = +params['id'];
      }
    });
  }

  goBack(param: string) {
    this.router.navigate([param]);
  }

  ngOnInit() {
    if (this.fileId) {
      this.getFile();
    }
    this.initForm();
    this.getCampaings();
    this.getCategories();
  }

  initForm() {
    this.registerFileForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      category: this.fb.control<number>(null, Validators.required),
      file: [''],
    });
  }

  get fileControl() {
    return this.registerFileForm.controls['file'] as FormControl;
  }

  getCategories() {
    this.categoryService.getCategories({}).subscribe((res) => {
      this.categories = res.data;
    });
  }

  getCampaings() {
    this.campaingService.getCampaings({}).subscribe({
      next: (res) => {
        this.campaings = res.data;
      },
    });
  }

  getFile() {
    this.filesService.getFileById(this.fileId).subscribe({
      next: (res) => {
        this.file = res;
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerFileForm.patchValue({
      ...this.file,
      category: this.file.category.id,
    });
  }

  sendForm() {
    if (this.fileId) {
      this.updateImage();
      return;
    }
    this.registerImage();
  }

  updateImage() {
    if (this.registerFileForm.valid && this.uploadedFile) {
      this.file = {
        ...this.registerFileForm.value,
      };

      let formData = new FormData();

      formData.append('file', this.uploadedFile);
      formData.append('fileInfo', JSON.stringify(this.file));

      this.filesService.updateFile(this.fileId, formData).subscribe({
        next: (res) => {
          this.swalService.success.fire('Sucesso!', res.message).then(() => {
            this.goBack('files');
          });
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error.fire('Erro', error.error.message).then(() => {
            this.goBack('files');
          });
        },
      });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }

  processFile(fileInput: any) {
    this.uploadedFile = null;
    this.uploadedFile = fileInput.files[0];
    console.log(fileInput.files[0]);
  }

  registerImage() {
    if (this.registerFileForm.valid && this.uploadedFile) {
      this.file = {
        ...this.registerFileForm.value,
      };

      let formData = new FormData();

      formData.append('file', this.uploadedFile);
      formData.append('fileInfo', JSON.stringify(this.file));

      this.filesService.uploadFile(formData).subscribe({
        next: (res) => {
          this.swalService.success.fire('Sucesso!', res.message).then(() => {});
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error
            .fire('Erro', error.error.message)
            .then(() => {});
        },
      });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }
}
