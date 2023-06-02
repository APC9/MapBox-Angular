import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkersAndColor{
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color: string;
  lnglat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map')
  public divMap?:ElementRef;

  public markers: MarkersAndColor[]=[];
  public zoom:number = 10;
  public map?: Map;
  public lnglat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if(!this.divMap) throw'Element HTML not fount';

    this.map = new Map({
      container: this.divMap.nativeElement , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.readFromLocalStorage();
    /* const marker = new Marker()
      .setLngLat( this.lnglat )
      .addTo(this.map) */
  }

  createMarker(){
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnlat = this.map.getCenter()

    this.addMarker(lgnlat, color);
  }

  addMarker( lngLat: LngLat, color: string ){
    if (!this.map ) return;

    const marker = new Marker({
      color,
      draggable: true
    }).setLngLat( lngLat )
      .addTo( this.map)

    this.markers.push({ color, marker });
    this.saveToLocalStorage()

    marker.on('dragend', ()=> this.saveToLocalStorage() )
  }

  deleteMarker( index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index, 1)
  }

  flyTo( marker: Marker){
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarker: PlainMarker[] = this.markers.map( ({color, marker}) => ({
      color,
      lnglat: marker.getLngLat().toArray()
    }))

    localStorage.setItem('markers', JSON.stringify(plainMarker))
  }

  readFromLocalStorage(){
    const plainMarkersStrin = localStorage.getItem('markers') ?? '[]';
    const plainMarkers:PlainMarker[] = JSON.parse(plainMarkersStrin);

    plainMarkers.forEach( ({color, lnglat}) => {
      const [ lng, lat ] = lnglat;
      const coords = new LngLat( lng, lat)
      this.addMarker(coords, color)
    })

  }

}
