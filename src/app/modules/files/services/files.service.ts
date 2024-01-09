import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSuccess } from '../../../_shared/models/http-success.model';
import { IPaginationRes } from '../../../_shared/models/pagination.model';
import { IFiles } from '../models/files.model';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  getFiles(params: any): Observable<IPaginationRes<IFiles>> {
    return this.http.get<IPaginationRes<IFiles>>('/files', {
      params: { ...params },
    });
  }

  getFileById(id: number): Observable<IFiles> {
    return this.http.get<IFiles>(`/files/${id}`);
  }
  postFile(File: IFiles): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/files/register', File);
  }

  uploadFile(File: FormData): Observable<HttpSuccess> {
    return this.http.post<HttpSuccess>('/files/upload', File);
  }

  updateFile(id: number, File: FormData): Observable<HttpSuccess> {
    return this.http.put<HttpSuccess>(`/files/upload/${id}`, File);
  }

  deleteFilesById(id: number) {
    return this.http.delete<HttpSuccess>(`/files/delete/${id}`);
  }
}
