import { Component } from '@angular/core';

interface MenuItem{
  name:string;
  router: string;
}


@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItem:MenuItem[] =[
    { router:'/maps/fullscreen',  name: 'Fullscreen' },
    { router:'/maps/zoom-range',  name: 'Zoom' },
    { router:'/maps/markers',     name: 'Markers' },
    { router:'/maps/properties',  name: 'Houses' },
  ]
}
