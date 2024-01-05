import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { IVideos } from '../models/videos.model';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(private http: HttpClient) {}

  getVideos(params: any): Observable<IPaginationRes<IVideos>> {
    return this.http.get<IPaginationRes<IVideos>>('/videos', {
      params: { ...params },
    });
  }

  postVideos(video: IVideos): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/videos/register', video);
  }

  updateVideos(id: number, video: IVideos): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/videos/update/${id}`, video);
  }
}
