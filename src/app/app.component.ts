import { Component } from '@angular/core';
import {FileService} from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-new-app';
  file: any[] = [];
  imgArray: any[] = [];
  imgTypes = ['jpg', 'jpeg', 'png', 'gif'];

  constructor(fileService: FileService) {
  }
  async handleUploadChange(event: any) {

    event.preventDefault();
    const files = event.target.files || [];
    console.log(files);

    const readUploadedFileAsDataUrl = (inputFile) => {
      const fileReader = new FileReader();

      return new Promise((resolve, reject) => {
        fileReader.onerror = () => {
          fileReader.abort();
          reject(new DOMException('Problem parsing input file.'));
        };
        fileReader.readAsDataURL(inputFile);
        fileReader.onloadend = () => {
          resolve(fileReader.result);
        };

      });
    };
    for (let index = 0; index < files.length; index++) {

          const extension = files[index].name.split('.').pop().toLowerCase();
          if (this.imgTypes.indexOf(extension) > -1) {
            console.log(files[index]);
            readUploadedFileAsDataUrl(files[index]).then(e => {
             this.imgArray.push(e);
             console.log(e);
            });
          } else {
            this.imgArray.push('');
          }

          // this.imgArray.push(data);
    }

    console.log(this.imgArray, 'lashi');
    this.file = this.imgArray;
  }









}
