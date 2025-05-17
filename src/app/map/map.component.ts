import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  private map!: L.Map;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private centroid: L.LatLngExpression = [-25.7472, 28.2511];
  private droneLat = -25.7572;
  private droneLng = 28.2511;

  private markerHQ!: L.Marker;
  private markerDrone!: L.Marker;
  private markerCust!: L.Marker;

  private dustArray: L.Circle[] = [];

  public onUp() : void {
    this.droneLat += 0.0001;
    this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
    console.log(this.droneLat + " " + this.droneLng);
  }

  public onDown() : void {
    this.droneLat -= 0.0001;
    this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
    console.log(this.droneLat + " " + this.droneLng);
  }

  public onRight() : void {
    this.droneLng += 0.0001;
    this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
    console.log(this.droneLat + " " + this.droneLng);
  }

  public onLeft() : void {
    this.droneLng -= 0.0001;
    this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
    console.log(this.droneLat + " " + this.droneLng);
  }

  private setDust() : void {
    var count = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    var LatMax = -25.7016;
    var LngMax = 28.2005;
    var LatMin = -25.7932;
    var LngMin = 28.3023;

    for (var i = 0; i < count; i++) {
      var dustLat = Math.floor(Math.random() * (LatMax - LatMin + 1) + LatMin);
      var dustLng = Math.floor(Math.random() * (LngMax - LngMin + 1) + LngMin);

      console.log(this.dustArray);
      this.dustArray[i].setLatLng([dustLat, dustLng]);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((L) => {
        this.initMap(L);
      });
    }
  }

  private initMap(L: any): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 13,
      zoomControl: false,
      scrollWheelZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragging: false,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map); 
    
    var iconHQ = L.icon({
      iconUrl: 'https://images.vexels.com/media/users/3/145153/isolated/lists/59e40df1bbed9f4f9b7a8064af57d353-towers-building-silhouette.png',
      iconSize: [30, 30],
    })
    this.markerHQ = L.marker(this.centroid, {icon: iconHQ}).addTo(this.map);
    this.markerHQ.bindPopup("Headquarters").openPopup();

    var iconDrone = L.icon({
      iconUrl: 'https://drone4hire.us/wp-content/uploads/2021/11/drone-quad-thin.png',
      iconSize: [38, 38],
    })
    this.markerDrone = L.marker([this.droneLat, this.droneLng], {icon: iconDrone}).addTo(this.map);
    this.markerDrone.bindPopup("Drone");

    var iconCust = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/256/9008/9008931.png',
      iconSize: [30, 30],
    })
    this.markerCust = L.marker([-25.7472, 28.27], {icon: iconCust}).addTo(this.map);
    this.markerCust.bindPopup("Customer");

    var radius = L.circle(this.centroid, {
    color: 'red',
    fillColor: '#ffffff',
    fillOpacity: 0.1,
    radius: 5000
    }).addTo(this.map);

    var LatMax = -25.7016;
    var LngMax = 28.3023;
    var LatMin = -25.7932;
    var LngMin = 28.2005;

    for (var i = 0; i < 10; i++) {
      var dustLat = (Math.random() * (LatMax - LatMin + 0.0001) + LatMin);
      var dustLng = (Math.random() * (LngMax - LngMin + 0.0001) + LngMin);

      var dustPoint = L.circle([dustLat, dustLng], {
        color: 'blue',
        fillColor: '#0000ff',
        fillOpacity: 0.1,
        radius: 10
      }).addTo(this.map);

      this.dustArray.push(dustPoint);
    }

    console.log(this.dustArray);
    //setInterval(this.setDust, 3000);
  }
}