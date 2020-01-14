import { Component } from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';
import  {createWorker, createScheduler}  from 'tesseract.js';
import { GoogleCloudVisionServiceService } from '../../google-cloud-vision-service.service';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';

const cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.height,
  camera: 'rear',
  tapPhoto: true,
  previewDrag: true,
  toBack: true,
  alpha: 1
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedImage: string;
  imageText: string;
  static imageText: any;



  constructor(private ocr: OCR,
              private vision: GoogleCloudVisionServiceService,
              public loadingController: LoadingController,
              private nav : NavController,
              private cameraPreview: CameraPreview
   ) {
    this.selectedImage = 'assets/image/start.png'
   }


  async onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
   
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
    
    

      //   this.selectedImage= 'data:image/jpeg;base64,'+image.base64String

    //      //ionic recommended OCR
    //     // this.ocr.recText(OCRSourceType.NORMFILEURL, image.dataUrl)
    //     // .then((res: OCRResult) => {
    //     //   let count = 0;
    //     //   res.lines.linetext.forEach(item=>{
    //     //     this.imageText += count + ': ' + item + '\n';
    //     //     count++;
    //     //   });
    //     // })
          
    //     // .catch((error: any) => console.error(error));

    //     //tessract 
    //     // const worker = createWorker();
    //     // (async () => {
    //     //   await worker.load();
    //     //   await worker.loadLanguage('ara');
    //     //   await worker.initialize('ara');
    //     //   const { data: { text } } = await worker.recognize(this.selectedImage);
    //     //   this.imageText = text;
    //     //   await worker.terminate();
    //     // })();

        //Google Cloud
      //   this.vision.getLabels(image.base64String).subscribe(async (result) => {
      //     this.imageText = result['responses']["0"].fullTextAnnotation.text;
      //     HomePage.imageText = result['responses']["0"].textAnnotations;
      //     console.log(result['responses']["0"].textAnnotations);
      // });
      
  // });
   
   }

  onDelImage(){
    this.selectedImage = 'assets/image/start.png'
    this.imageText = '';
  }

  Details(){
    this.nav.navigateForward('/details')
  }
  
}