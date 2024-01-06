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
import { IImages } from '../../../images/models/images.model';
import { ImagesService } from '../../../images/services/images.service';

@Component({
  selector: 'app-images-register',
  templateUrl: './images-register.component.html',
  styleUrls: ['./images-register.component.scss'],
})
export class ImagesRegisterComponent implements OnInit {
  registerImageForm: FormGroup;
  images: IImages;
  imagesId: number;

  imageSrc: string;

  file: File;
  campaings: ICampaing[] = [];

  categories: ICategory[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private imagesService: ImagesService,
    private categoryService: CategoryService,
    private campaingService: CampaingService,

    private swalService: SwalService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.imagesId = +params['id'];
      }
    });
  }

  goBack(param: string) {
    this.router.navigate([param]);
  }

  ngOnInit() {
    if (this.imagesId) {
    }
    this.initForm();
    this.getCampaings();
    this.getCategories();
  }

  initForm() {
    this.registerImageForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      category: this.fb.control<number>(null, Validators.required),
      campaing: this.fb.control<number>(null, Validators.required),
    });
  }

  get linkControl() {
    return this.registerImageForm.controls['link'] as FormControl;
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

  populateForms() {
    this.registerImageForm.patchValue({ ...this.images });
  }

  sendForm() {
    if (this.imagesId) {
      this.updateImage();
      return;
    }
    this.registerImage();
  }

  updateImage() {
    if (this.registerImageForm.valid) {
      this.images = {
        ...this.registerImageForm.value,
      };
      this.imagesService.updateImages(this.imagesId, this.images).subscribe({
        next: (res) => {
          this.swalService.success.fire('Sucesso!', res.message).then(() => {
            this.goBack('images');
          });
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error.fire('Erro', error.error.message).then(() => {
            this.goBack('images');
          });
        },
      });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }

  processFile(imageInput: any) {
    this.file = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.imageSrc = event.target.result;
    });

    reader.readAsDataURL(this.file);
  }

  registerImage() {
    this.images = {
      ...this.registerImageForm.value,
    };

    let formData = new FormData();

    formData.append('image', this.file);
    formData.append('imageInfo', JSON.stringify(this.images));

    this.imagesService.uploadImage(formData).subscribe({
      next: (res) => {
        this.swalService.success.fire('Sucesso!', res.message).then(() => {});
      },
      error: (error: HttpErrorResponse) => {
        this.swalService.error.fire('Erro', error.error.message).then(() => {});
      },
    });
  }
}
