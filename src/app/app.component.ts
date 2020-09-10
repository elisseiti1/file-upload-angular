import { Component } from '@angular/core';
import {FileService} from './file.service';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-new-app';
  file: [];
  imgArray = [];
  imgTypes = ['jpg', 'jpeg', 'png', 'gif'];

  constructor(fileService: FileService) {
  }
  handleUploadChange(event: any): void {

    event.preventDefault();
    const files = event.target.files || [];
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[index]);
      reader.onload = (event: any) => {
        if (reader.readyState === 2) {
          const extension = files[index].name.split('.').pop().toLowerCase();
          if ( this.imgTypes.indexOf(extension) > -1 )
          {
            this.imgArray.push(event.target.result);
          }
          else
          {
            this.imgArray.push('');
          }
        }
      };
    }
    this.uploadFile(this.imgArray);
    }

  uploadFile = files => {
    console.log(files);
    if (files.length) {
      files.forEach(async file => {
        const formPayload = new FormData();
        formPayload.append('file', file.file);
        console.log(formPayload);
        try {
          await axios({
            baseURL: 'http://localhost:5000',
            url: '/file',
            method: 'post',
            data: formPayload,
            onUploadProgress: progress => {
              const { loaded, total } = progress;

              const percentageProgress = Math.floor((loaded / total) * 100);
            },
          });
        } catch (error) {
          console.log(error);
        }
      });
    }

    // const readUploadedFileAsBase64 = async (inputFile): Promise<Promise> => {
    //   const temporaryFileReader = new FileReader();
    //
    //   return new Promise((resolve, reject) => {
    //     temporaryFileReader.onerror = () => {
    //       temporaryFileReader.abort();
    //       reject(new DOMException('Problem parsing input file.'));
    //     };
    //
    //     temporaryFileReader.onload = () => {
    //       console.log(temporaryFileReader.result);
    //       resolve(temporaryFileReader.result);
    //     };
    //     temporaryFileReader.readAsDataURL(inputFile);
    //   });
    // };
  }
}
