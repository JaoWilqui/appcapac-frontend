import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { IImages } from '../models/images.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  getImages(params: any): Observable<IPaginationRes<IImages>> {
    return this.http.get<IPaginationRes<IImages>>('/images', {
      params: { ...params },
    });
  }

  postImage(image: IImages): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/images/register', image);
  }

  uploadImage(image: FormData): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/images/upload', image);
  }

  updateImages(id: number, video: IImages): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/images/update/${id}`, video);
  }

  deleteImagesById(id: number) {
    return this.http.delete<HttpSuccess>(`/images/delete/${id}`);
  }
}
