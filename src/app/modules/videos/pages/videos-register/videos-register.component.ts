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

  categories: ICategory[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private videosService: VideosService,
    private categoryService: CategoryService,
    private campaingService: CampaingService,

    private swalService: SwalService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.videosId = +params['id'];
      }
    });
  }

  goBack(param: string) {
    this.router.navigate([param]);
  }

  ngOnInit() {
    if (this.videosId) {
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
      category: this.fb.control<number>(null, Validators.required),
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
      this.videosService.updateVideos(this.videosId, this.videos).subscribe({
        next: (res) => {
          this.swalService.success.fire('Sucesso!', res.message).then(() => {
            this.goBack('videos');
          });
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error.fire('Erro', error.error.message).then(() => {
            this.goBack('videos');
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
            this.goBack('videos');
          });
        },
        error: (error: HttpErrorResponse) => {
          this.swalService.error.fire('Erro', error.error.message).then(() => {
            this.goBack('videos');
          });
        },
      });
    } else {
      this.swalService.warning.fire('Aviso!', 'Há campos a serem preenchidos');
    }
  }
}
