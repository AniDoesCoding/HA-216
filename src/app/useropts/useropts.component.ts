import { Component } from '@angular/core';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-useropts',
  imports: [MapComponent],
  templateUrl: './useropts.component.html',
  styleUrl: './useropts.component.css'
})
export class UseroptsComponent {
  public viewOut = false;
  public request = false;

  public view() : void {
    this.viewOut = true;
    this.request = false;
  }

  public req() : void {
    this.viewOut = false;
    this.request = true;
  }
}
