import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  AdhesionOption,
  adhesionOptions,
} from '../../../../_shared/models/adhesion.model';
import { brlStates } from '../../../../_shared/models/states.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../../campaing/models/campaing.model';
import { CampaingService } from '../../../campaing/services/campaing.service';
import { IOperator } from '../../../operators/models/operators.model';
import { OperatorsService } from '../../../operators/services/operators.service';
import { IProduct } from '../../../products/models/product.model';
import { ProductService } from '../../../products/services/product.service';
import { IFiles } from '../../models/files.model';
import { FilesService } from '../../services/files.service';
import { BrlState } from './../../../../_shared/models/states.model';

@Component({
  selector: 'app-register-files',
  templateUrl: './register-files.component.html',
  styleUrls: ['./register-files.component.scss'],
})
export class RegisterFilesComponent implements OnInit {
  registerFileForm: FormGroup;
  fileId: number;

  fileObject: IFiles;

  states: BrlState[] = brlStates;

  file: File;
  operators: IOperator[] = [];

  adhesions: AdhesionOption[] = adhesionOptions;

  campaings: ICampaing[] = [];

  products: IProduct[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private filesService: FilesService,
    private productService: ProductService,
    private campaingService: CampaingService,
    private operatorsService: OperatorsService,
    private dialogRef: MatDialogRef<RegisterFilesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private swalService: SwalService
  ) {
    if (this.data) this.fileId = this.data?.id;
  }

  goBack() {
    this.dialogRef.close(true);
  }
  ngOnInit() {
    if (this.fileId) {
      this.getFile();
    }
    this.initForm();
    // this.getCampaings();
    this.getProducts();
    this.getOperators();
  }

  initForm() {
    this.registerFileForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      product: this.fb.control<number>(null, Validators.required),
      file: [null, [Validators.required]],
      tipo: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      adesao: ['', [Validators.required]],
      operator: this.fb.control<number>(null, Validators.required),
    });
  }

  get fileControl() {
    return this.registerFileForm.controls['file'] as FormControl;
  }

  getProducts() {
    this.productService.getProducts({}).subscribe((res) => {
      this.products = res.data;
    });
  }

  getOperators() {
    this.operatorsService.getOperators({}).subscribe((res) => {
      this.operators = res.data;
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
      next: async (res) => {
        this.fileObject = res;

        const file = await firstValueFrom(
          this.filesService.downloadFile(this.fileObject.fileRelativePath)
        );

        const fileInput = new File(
          [file],
          `${
            'arquivo_' +
            this.fileObject.id +
            '.' +
            this.fileObject.fileRelativePath.split('.').pop()
          }`
        );

        this.fileControl.setValue(fileInput.name);

        this.processFile(fileInput);
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerFileForm.patchValue({
      ...this.fileObject,
      product: this.fileObject.product.id,
      operator: this.fileObject.operator.id,
    });
  }

  sendForm() {
    if (this.fileId) {
      this.updateImage();
      return;
    }
    this.registerImage();
  }

  processFile(fileInput: File) {
    this.fileControl.setValue(fileInput.name);
    this.file = null;
    this.file = fileInput;
  }

  updateImage() {
    if (this.registerFileForm.valid && this.file) {
      this.fileObject = {
        ...this.registerFileForm.value,
      };

      let formData = new FormData();

      formData.append('file', this.file);
      formData.append('fileInfo', JSON.stringify(this.fileObject));

      this.filesService.updateFile(this.fileId, formData).subscribe({
        next: (res) => {
          this.swalService.success.fire('Sucesso!', res.message).then(() => {
            this.goBack();
          });
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error.fire('Erro', error.error.message).then(() => {
            this.goBack();
          });
        },
      });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }

  registerImage() {
    if (this.registerFileForm.valid && this.file) {
      this.fileObject = {
        ...this.registerFileForm.value,
      };

      let formData = new FormData();

      formData.append('file', this.file);
      formData.append('fileInfo', JSON.stringify(this.fileObject));

      this.filesService.uploadFile(formData).subscribe({
        next: (res) => {
          this.swalService.success.fire('Sucesso!', res.message).then(() => {
            this.goBack();
          });
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error.fire('Erro', error.error.message).then(() => {
            this.goBack();
          });
        },
      });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }
}
