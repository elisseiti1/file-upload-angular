import { Component } from '@angular/core';
import {FileService} from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-new-app';
  file: [];
  imgArray: any;
  imgTypes = ['jpg', 'jpeg', 'png', 'gif'];

  constructor(fileService: FileService) {
  }
  handleUploadChange(event: any) {

    event.preventDefault();
    const files = event.target.files || [];
    console.log(files);

    const readUploadedFileAsBase64 =  (inputFile) => {
      const temporaryFileReader = new FileReader();

      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException('Problem parsing input file.'));
        };

        temporaryFileReader.onload = () => {
          console.log(temporaryFileReader.result)
          resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsDataURL(inputFile);
      });
    };




    for (let index = 0; index < files.length; index++) {
          const extension = files[index].name.split('.').pop().toLowerCase();
          if (this.imgTypes.indexOf(extension) > -1) {
            readUploadedFileAsBase64(event.target.files[index]).then((value) => this.imgArray.push(value));
          //  this.imgArray.push(readUploadedFileAsBase64(event.target.files[index]).then());
          } else {
            this.imgArray.push('');
          }
    }
    this.file = this.imgArray;
  }
}
