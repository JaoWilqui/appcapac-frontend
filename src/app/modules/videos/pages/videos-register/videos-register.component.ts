import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../../../_shared/services/swal.service';
import { ICampaing } from '../../../campaing/models/campaing.model';
import { CampaingService } from '../../../campaing/services/campaing.service';
import { ImagesRegisterComponent } from '../../../images/pages/images-register/images-register.component';
import { IProduct } from '../../../products/models/product.model';
import { ProductService } from '../../../products/services/product.service';
import { IVideos } from '../../models/videos.model';
import { VideosService } from './../../services/videos.service';

@Component({
  selector: 'app-videos-register',
  templateUrl: './videos-register.component.html',
  styleUrls: ['./videos-register.component.scss'],
})
export class VideosRegisterComponent implements OnInit {
  registerVideoForm: FormGroup;
  videos: IVideos;
  videosId: number;

  campaings: ICampaing[] = [];

  products: IProduct[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private videosService: VideosService,
    private productService: ProductService,
    private campaingService: CampaingService,

    private swalService: SwalService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<ImagesRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
  ) {
    if (this.data) this.videosId = this.data?.id;
  }

  goBack() {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    if (this.videosId) {
      this.getVideo();
    }
    this.initForm();
    this.getCampaings();
    this.getCategories();
  }

  initForm() {
    this.registerVideoForm = this.fb.group({
      nome: ['', [Validators.required]],
      link: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      product: this.fb.control<number>(null, Validators.required),
      campaing: this.fb.control<number>(null, Validators.required),
    });
  }

  get linkControl() {
    return this.registerVideoForm.controls['link'] as FormControl;
  }

  getEmbedLink(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    const videoId = match && match[2].length === 11 ? match[2] : null;

    return 'https://www.youtube.com/embed/' + videoId;
  }

  getVideo() {
    this.videosService.getVideoById(this.videosId).subscribe({
      next: (res) => {
        console.log(res);
        this.videos = res;
        this.populateForm();
      },
    });
  }

  populateForm() {
    this.registerVideoForm.patchValue({
      ...this.videos,
      product: this.videos.product.id,
      campaing: this.videos.campaing.id,
    });
  }

  getCategories() {
    this.productService.getProducts({}).subscribe((res) => {
      this.products = res.data;
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
    this.registerVideoForm.patchValue({ ...this.videos });
  }

  sendForm() {
    if (this.videosId) {
      this.updateVideo();
      return;
    }
    this.registerVideo();
  }

  updateVideo() {
    if (this.registerVideoForm.valid) {
      this.videos = {
        ...this.registerVideoForm.value,
      };

      this.videos.link = this.getEmbedLink(
        this.registerVideoForm.controls['link'].value
      );
      this.videosService.updateVideos(this.videosId, this.videos).subscribe({
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

  registerVideo() {
    if (this.registerVideoForm.valid) {
      this.videos = {
        ...this.registerVideoForm.value,
      };

      this.videos.link = this.getEmbedLink(
        this.registerVideoForm.controls['link'].value
      );

      this.videosService.postVideos(this.videos).subscribe({
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
