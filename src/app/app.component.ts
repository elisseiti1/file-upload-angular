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

  uploadFile(files){
    if (files.length) {
      files.forEach(async file => {
        console.log(file);
        this.fileService.uploadFile(file).subscribe(e => {
          console.log(e);
          console.log('UII');
        });
    });
    }
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
