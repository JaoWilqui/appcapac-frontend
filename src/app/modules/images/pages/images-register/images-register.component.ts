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
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdhesionOption,
  adhesionOptions,
} from '../../../../_shared/models/adhesion.model';
import { BrlState, brlStates } from '../../../../_shared/models/states.model';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../../campaing/models/campaing.model';
import { CampaingService } from '../../../campaing/services/campaing.service';
import { ICategory } from '../../../category/models/category.model';
import { CategoryService } from '../../../category/services/category.service';
import { IImages } from '../../../images/models/images.model';
import { ImagesService } from '../../../images/services/images.service';
import { IOperator } from '../../../operators/models/operators.model';
import { OperatorsService } from '../../../operators/services/operators.service';

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

  categories: ICategory[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private imagesService: ImagesService,
    private categoryService: CategoryService,
    private campaingService: CampaingService,
    private operatorsService: OperatorsService,
    private swalService: SwalService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<ImagesRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.imagesId = +params['id'];
      }
    });
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
      category: this.fb.control<number>(null, Validators.required),
      campaing: this.fb.control<number>(null, Validators.required),
      imageFile: [''],
      adesao: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      operator: this.fb.control<number>(null, Validators.required),
    });
  }

  get imageControl() {
    return this.registerImageForm.controls['imageControl'] as FormControl;
  }

  getCategories() {
    this.categoryService.getCategories({}).subscribe((res) => {
      this.categories = res.data;
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
      next: (res) => {
        this.images = res;
        this.imageSrc = res.imageRelativePath;
        this.populateForms();
      },
    });
  }

  populateForms() {
    this.registerImageForm.patchValue({
      ...this.images,
      campaing: this.images.campaing.id,
      category: this.images.category.id,
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
    this.imageFile = imageInput.files[0];
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
