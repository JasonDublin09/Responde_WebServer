import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-viewreports',
  templateUrl: './viewreports.component.html',
  styleUrls: ['./viewreports.component.css']
})
export class ViewreportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey:'AIzaSyCJkK42-ShnYgB3jlwtxWwZeP0B5b3suGY'
    })

    loader.load().then(()=> {
      new google.maps.Map(document.getElementById('map')!,{
        center:{lat:14.6182, lng: 121.0010 },
        zoom: 19
      })
    })
  }

}
