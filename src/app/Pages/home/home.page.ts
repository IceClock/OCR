import { Component } from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedImage: string;
  imageText: string;
  
  constructor(private ocr: OCR,
   ) {
    this.selectedImage = 'assets/image/start.png'
   }
   onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
      Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      resultType: CameraResultType.DataUrl,
    })
      .then(image => {
        this.selectedImage= image.dataUrl
        this.ocr.recText(OCRSourceType.NORMFILEURL, image.dataUrl)
        .then((res: OCRResult) => {
          this.imageText = res.words.wordtext.toString().replace(new RegExp(',', 'g'),' ');
        })
          
        .catch((error: any) => console.error(error));
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  onDelImage(){
    this.selectedImage = 'assets/image/start.png'
    this.imageText = '';
  }
  
}