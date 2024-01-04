import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { ICampaing } from '../models/campaing.model';

@Injectable({ providedIn: 'root' })
export class CampaingService {
  constructor(private http: HttpClient) {}

  getCampaings(params: any): Observable<any> {
    return this.http.get<IPaginationRes<ICampaing>>('/campaing', {
      params: { ...params },
    });
  }

  postCampaings(campaing: ICampaing): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/campaing/register', campaing);
  }

  getCampaingById(id: number): Observable<ICampaing> {
    return this.http.get<ICampaing>(`/campaing/${id}`);
  }

  updateCampaing(id: number, campaing: ICampaing): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/campaing/update/${id}`, campaing);
  }
}
