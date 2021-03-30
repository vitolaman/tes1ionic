import { FotoService } from '../services/foto.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
export interface fileFoto {
  name: string; //filepath
  path: string; //webviewPath
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  urlImageStorage : string[] = [];
  public itemUploadFoto : Photo[] = [];
  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService
  ) { }

  TambahFoto() {
    this.fotoService.tambahFoto();
  }
  clickAdd(itemPhoto){
    this.itemUploadFoto.unshift(itemPhoto);
    console.log(this.itemUploadFoto);
  }
  uploadFoto(){
    this.urlImageStorage=[];
    for(var index in this.itemUploadFoto) {
      const imgFilepath = `imgStorage/${this.itemUploadFoto[index].filePath}`;

      this.afStorage.upload(imgFilepath, this.itemUploadFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url);
          console.log(url);
        });
      });
    }
    this.itemUploadFoto = [];
  }
}

export interface Photo{
  filePath : string;
  webviewPath : string;
  dataImage : File;
}