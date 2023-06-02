import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';

@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map')
  public divMap?:ElementRef;

  public zoom:number = 10;
  public map?: Map;
  public lnglat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if(!this.divMap) throw'Element HTML not fount';

    this.map = new Map({
      container: this.divMap.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    this.mapListener()
  }

  ngOnDestroy(): void {
      this.map?.remove()
  }

  mapListener(){
    if( !this.map ) throw 'Mapa no inicializado';

    this.map.on( 'zoom', ev =>{
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', ev =>{
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18)
    })

    this.map.on('moveend', ()=> this.lnglat = this.map!.getCenter() )
  }


  zoomIn(){
    this.map?.zoomIn()
  }

  zoomOut(){
    this.map?.zoomOut()
  }

  zoomChange(value:string){
    this.zoom = +value;
    this.map?.zoomTo( this.zoom)
  }
}
