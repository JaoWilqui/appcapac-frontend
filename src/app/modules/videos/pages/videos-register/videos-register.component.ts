import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registerCategoryForm: FormGroup;
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
    this.registerCategoryForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      category: ['', Validators.required],
      campaing: ['', Validators.required],
    });
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
    this.registerCategoryForm.patchValue({ ...this.videos });
  }

  sendForm() {
    if (this.videosId) {
      this.updateUser();
      return;
    }
    this.registerUser();
  }

  updateUser() {
    if (this.registerCategoryForm.valid) {
      this.videos = {
        ...this.registerCategoryForm.value,
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

  registerUser() {
    if (this.registerCategoryForm.valid) {
      this.videos = {
        ...this.registerCategoryForm.value,
      };
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
