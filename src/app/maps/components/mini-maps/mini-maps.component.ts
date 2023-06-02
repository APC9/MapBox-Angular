import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-maps',
  templateUrl: './mini-maps.component.html',
  styleUrls: ['./mini-maps.component.css']
})
export class MiniMapsComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?:ElementRef;

  @Input()
  public lngLat?: [number, number];
  public map?: Map;

  ngAfterViewInit(): void {

    if(!this.divMap?.nativeElement ) throw'Map not found'
    if ( !this.lngLat ) throw'lngtal is required'

    this.map = new Map({
      container: this.divMap.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 17, // starting zoom
      interactive: false
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo(this.map)
  }
}
