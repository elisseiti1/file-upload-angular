import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
   baseURL = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  // POST /
  uploadFile(file: any){
    console.log(file, 'Lashi');

    const endpoint = this.baseURL + '/file';
    console.log(endpoint);
    const formData: FormData = new FormData();
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('responseType', 'json');

    formData.append('file', file);
    return this.http.post(endpoint, formData, {
      headers: httpHeaders,
      reportProgress: true
    });
  }
}
