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
  imgArray = [];
  imgTypes = ['jpg', 'jpeg', 'png', 'gif'];

  constructor(private fileService: FileService) {
  }
  async handleUploadChange(event: any) {

    event.preventDefault();
    const files = event.target.files || [];
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      const extension = files[index].name.split('.').pop().toLowerCase();
      const in_file = files[index];

      if ( this.imgTypes.indexOf(extension) > -1 ) {
        const readUploadedFileAsText = (inputFile) => {
          const fileReader = new FileReader();

          return new Promise((resolve, reject) => {
            fileReader.onerror = () => {
              fileReader.abort();
              reject(new DOMException('Problem parsing input file.'));
            };

            fileReader.onload = () => {
              resolve(fileReader.result);
            };
            fileReader.readAsDataURL(inputFile);
          });
        };

        const fileContents = await readUploadedFileAsText(in_file);
        this.imgArray.push(fileContents);
      }
      else{
        this.imgArray.push('');
      }

    }

    // console.log(this.imgArray);
    this.uploadFile(this.imgArray);
  }

  uploadFile(files){
    if (files.length) {
      files.forEach(async file => {
        console.log(file, 'lesh');
        this.fileService.uploadFile(file)
    });
    }
  }

}
