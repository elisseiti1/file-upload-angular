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
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const extension = files[index].name.split('.').pop().toLowerCase();
          if (this.imgTypes.indexOf(extension) > -1) {
            this.imgArray.push(reader.result);
          } else {
            this.imgArray.push('');
          }
          this.file = this.imgArray;
        }
      };

      reader.readAsDataURL(event.target.files[index]);
    }
  }
}
