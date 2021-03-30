import { AngularFireStorage } from '@angular/fire/storage'
import { Component, OnInit } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { Router } from '@angular/router';
export interface fileFoto {
  name: string; //filepath
  path: string; //webviewPath
}
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {

  urlImageStorage : string[] = [];
  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  async ionViewDidEnter() {
      await this.fotoService.loadFoto();
      this.tampilkanData();
  }


  tampilkanData(){
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then(url =>{
            this.urlImageStorage.unshift(url);
            console.log("a", url);
          })
        })
      }).catch((error) => {
        console.log(error);
      })
  }

  pindah(gambar){
    this.fotoService.tab4Foto = gambar;
    console.log("pindah!");
    this.router.navigate(["/tab4/"]);
  }
}
