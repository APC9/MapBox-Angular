import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl';
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXBjOTEiLCJhIjoiY2xjMGpzZXh0MDNseTNwb2RueXp4bDB0NiJ9.UO9JYXS75G9EPZisRJL3uQ';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapsComponent } from './components/mini-maps/mini-maps.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './page/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './page/markers-page/markers-page.component';
import { PropertiesPageComponent } from './page/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './page/zoom-range-page/zoom-range-page.component';


@NgModule({
  declarations: [
    MiniMapsComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
