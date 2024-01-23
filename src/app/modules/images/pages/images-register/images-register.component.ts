import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import {
  AdhesionOption,
  adhesionOptions,
} from '../../../../_shared/models/adhesion.model';
import { BrlState, brlStates } from '../../../../_shared/models/states.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../../campaing/models/campaing.model';
import { CampaingService } from '../../../campaing/services/campaing.service';
import { IImages } from '../../../images/models/images.model';
import { ImagesService } from '../../../images/services/images.service';
import { IOperator } from '../../../operators/models/operators.model';
import { OperatorsService } from '../../../operators/services/operators.service';
import { IProduct } from '../../../products/models/product.model';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-images-register',
  templateUrl: './images-register.component.html',
  styleUrls: ['./images-register.component.scss'],
})
export class ImagesRegisterComponent implements OnInit {
  @ViewChild('pictureImg') pictureImage: ElementRef;

  registerImageForm: FormGroup;
  images: IImages;
  imagesId: number;

  imageSrc: string;

  states: BrlState[] = brlStates;

  adhesions: AdhesionOption[] = adhesionOptions;

  imageFile: File;
  campaings: ICampaing[] = [];

  operators: IOperator[] = [];

  products: IProduct[] = [];
  constructor(
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private productService: ProductService,
    private campaingService: CampaingService,
    private operatorsService: OperatorsService,
    private swalService: SwalService,
    private dialogRef: MatDialogRef<ImagesRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (this.data) this.imagesId = data.id;
  }

  goBack() {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    if (this.imagesId) {
      this.getImage();
    }
    this.initForm();
    this.getCampaings();
    this.getOperators();
    this.getCategories();
  }

  initForm() {
    this.registerImageForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      product: this.fb.control<number>(null, Validators.required),
      campaing: this.fb.control<number>(null, Validators.required),
      imageFile: [''],
      cidade: ['', [Validators.required]],
      adesao: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      operator: this.fb.control<number>(null, Validators.required),
    });
  }

  get imageControl() {
    return this.registerImageForm.controls['imageControl'] as FormControl;
  }

  getCategories() {
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

  getImage() {
    this.imagesService.getImageById(this.imagesId).subscribe({
      next: async (res) => {
        this.images = res;
        this.imageSrc = res.imageRelativePath;

        const img = await firstValueFrom(
          this.imagesService.downloadImage(this.imageSrc)
        );
        const imageFile = new File([img], 'name');
        console.log(imageFile);
        this.processFile(imageFile);

        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerImageForm.patchValue({
      ...this.images,
      campaing: this.images.campaing.id,
      product: this.images.product.id,
      operator: this.images.operator.id,
    });
  }

  sendForm() {
    if (this.imagesId) {
      this.updateImage();
      return;
    }
    this.registerImage();
  }

  updateImage() {
    if (this.registerImageForm.valid && this.imageFile) {
      this.images = {
        ...this.registerImageForm.value,
      };

      console.log(this.imageFile);

      let formData = new FormData();

      formData.append('image', this.imageFile);
      formData.append('imageInfo', JSON.stringify(this.images));

      this.imagesService.updateImages(this.imagesId, formData).subscribe({
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

  processFile(imageInput: any) {
    this.imageFile = null;
    this.imageFile = imageInput;
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.imageSrc = event.target.result;
    });

    reader.readAsDataURL(this.imageFile);
  }

  registerImage() {
    if (this.registerImageForm.valid && this.imageFile) {
      this.images = {
        ...this.registerImageForm.value,
      };

      let formData = new FormData();

      formData.append('image', this.imageFile);
      formData.append('imageInfo', JSON.stringify(this.images));

      this.imagesService.uploadImage(formData).subscribe({
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
