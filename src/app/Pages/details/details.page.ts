import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(private nav: NavController,
    ) { }
  DetailsArr = [];
  FirstAr: any;
  FatherAr: any;
  MiddleAr: any;
  LastAr: any;
  FirstEn: any;
  FatherEn: any;
  MiddleEn: any;
  LastEn: any;  
  MotherName: any;
  BirthDate: any;
  BirthPlace: any;
  Gender: any;
  id: any;

  regexID = new RegExp("\\d{10}")
  regexRmvchar = new RegExp('[^.-\\d]');
  regexDate = new RegExp("(0?[1-9]|[12]\\d|3[01])[\\/](0?[1-9]|1[0-2])[\\/](19|20)[\\d\\s]{2,3}");

  ngOnInit() {
  this.DetailsArr = HomePage.imageText;
  let count = 0
    this.DetailsArr.forEach( element => {
      if(element['description'].search("الاسم") != -1 || element['description'].search("الإسم") != -1 || element['description'].search("الاس") != -1){
        try{
        this.FirstAr = this.DetailsArr[count+1]['description']
        this.FatherAr= this.DetailsArr[count+2]['description']
        this.MiddleAr= this.DetailsArr[count+3]['description']
        this.LastAr= this.DetailsArr[count+4]['description']}
        catch{}
      }
      else if(element['description'].toLowerCase().search('name') != -1){
        try{
        if(element['description'].length <= 4){
        this.FirstEn = this.DetailsArr[count+1]['description']
        this.FatherEn= this.DetailsArr[count+2]['description']
        this.MiddleEn= this.DetailsArr[count+3]['description']
        this.LastEn= this.DetailsArr[count+4]['description']}
        else{
          
          this.FirstEn = element['description'].slice(5)
          this.FatherEn = this.DetailsArr[count+1]['description']
          this.MiddleEn= this.DetailsArr[count+2]['description']
          this.LastEn= this.DetailsArr[count+3]['description']

        }
      }
        catch{}
      } 
      else if(element['description'].search(this.regexID) != -1){
        this.id = element['description'];
      }
      else if(element['description'].search(this.regexDate) != -1)
      {
       let date = element['description'].split('/', 3) 
         let datenochar = date[2] +'-'+ date[1] +'-'+ date[0];  
         datenochar.replace(this.regexRmvchar,'');
         this.BirthDate = datenochar;
    }
    else if (element['description'].toLowerCase().search('m') != -1 || element['description'].toLowerCase().search('f') != -1){
      let gen = element['description'].split('/'); 
      this.Gender = gen;
    } 
    else if (element['description'].search("ام") != -1){
      this.MotherName = this.DetailsArr[count+1]['description'];
    } 
    else if(element['description'].search("كان") != -1 || element['description'].search("ولاد") != -1 ){
      this.BirthPlace = this.DetailsArr[count+1]['description'];

    }
   count++ });
  } 

  onClickBack(){
    this.nav.navigateForward('/home')
  }

}
