import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { IImages } from '../models/images.model';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private httpClient: HttpClient;

  constructor(private http: HttpClient, handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  getImages(params: any): Observable<IPaginationRes<IImages>> {
    return this.http.get<IPaginationRes<IImages>>('/images', {
      params: { ...params },
    });
  }

  getImageById(id: number): Observable<IImages> {
    return this.http.get<IImages>(`/images/${id}`);
  }
  postImage(image: IImages): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/images/register', image);
  }

  uploadImage(image: FormData): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/images/upload', image);
  }

  downloadImage(imagePath: string): Observable<any> {
    return this.httpClient.get(imagePath, { responseType: 'blob' });
  }
  updateImages(id: number, image: FormData): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/images/upload/${id}`, image);
  }

  deleteImagesById(id: number) {
    return this.http.delete<HttpSuccess>(`/images/delete/${id}`);
  }
}
