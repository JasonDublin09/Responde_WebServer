import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-viewreports',
  templateUrl: './viewreports.component.html',
  styleUrls: ['./viewreports.component.css']
})
export class ViewreportsComponent implements OnInit {

  markers:any
  lat= 14.6182
  lng= 121.0010
  map:any

  constructor() { }

  ngOnInit(): void {
    const mapproperties={
      center: {lat:this.lat,lng:this.lng},
      zoom:18,
    };
    let loader = new Loader({apiKey:'AIzaSyCJkK42-ShnYgB3jlwtxWwZeP0B5b3suGY'})
    loader.load().then(()=>{
      this.map = new google.maps.Map(document.getElementById('map')!,mapproperties);
      var marker = new google.maps.Marker({
        position:{lat:this.lat,lng:this.lng},
        map:this.map,
        label:"A"
      })
    })
    
    /*let loader = new Loader({
      apiKey:'AIzaSyCJkK42-ShnYgB3jlwtxWwZeP0B5b3suGY'
    })

    loader.load().then(()=> {
      new google.maps.Map(document.getElementById('map')!,{
        center:{lat:14.6182, lng: 121.0010 },
        zoom: 19
      })
    }); 
    */
    
    
  }


}
