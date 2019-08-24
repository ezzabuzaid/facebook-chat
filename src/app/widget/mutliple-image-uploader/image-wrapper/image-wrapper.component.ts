import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-wrapper',
  templateUrl: './image-wrapper.component.html',
  styleUrls: ['./image-wrapper.component.scss']
})
export class MultipleImageUploaderComponent implements OnInit {
  images = [];
  constructor(
    private fireStorage: AngularFireStorage,
  ) { }

  ngOnInit() { }

  async uploadPicture(files: FileList) {
    console.log(files);
    const imageContainer = (size, name, progress, url = '', completed = false) => ({
      size: size / 1000,
      name: name.substr(0, 10),
      completed,
      progress,
      url
    });
    // const uploadPromises = [];
    const filesArray = Array.from((new Set(files as any)));

    const iterate = async (file, index) => {
      const uploadTask: AngularFireUploadTask = this.fireStorage.upload(file.name, file);
      const { size, name } = (file);
      this.images.push(imageContainer(size, name, uploadTask.percentageChanges()));
      const downloadUrl = await (await uploadTask).ref.getDownloadURL();
      this.images[index].url = downloadUrl;
      // uploadPromises.push(uploadUrl);
    };


    filesArray.forEach(iterate);
    // const urlList = await Promise.all(uploadPromises);
    // this.images.push(urlList);
  }
  dragover(e: DragEvent) {
    console.log(e);
    e.preventDefault();
    return false;
  }
  drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
}
interface ImageContainer {
  size: number;
  name: string;
  speed: any;
  completed: boolean;
  progress: Observable<number>;
  url: string;
}
