import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseURL: 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  // POST /
  uploadFile(file: any){
    console.log(file);
    const endpoint = this.baseURL + '/file';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(endpoint, formData);
  }
}
