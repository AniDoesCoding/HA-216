import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  //Variables

  private map!: L.Map;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private centroid: L.LatLngExpression = [-25.7472, 28.2511];
  private droneLat = -25.7472;
  private droneLng = 28.2511;

  private markerHQ!: L.Marker;
  private markerDrone!: L.Marker;
  private markerCust!: L.Marker;

  private dustArray: L.Circle[] = [];
  private time = new Date();

  public height = 0;
  public flightState = "Ready";
  public battery = 0;
  public distance = 0;
  public deliverable = false;
  public distDev = 0;
  public current_operator_id = "null";
  public is_available = true;
  public is_op = true;

  //Functions

  public setState() : void {
    this.flightState = "Currently flying";
    this.height = 20;
    this.battery = 100;
    this.current_operator_id = "blank";
    this.is_available = false;
  }

  public minuteCalls() : void {
    var compTime = new Date();
    if (this.time.getMinutes() != compTime.getMinutes()) {
      this.time = compTime;
      this.battery -= 10;
      this.setDust();
    }
  }

  public checkContact(state : string) : void {
    for (var i = 0; i < 10; i++) {
      if (this.map.distance([this.droneLat, this.droneLng],this.dustArray[i].getLatLng()) < 100) {
        this.height += 5;
        switch (state) {
          case ("u") : {
            this.onDown();
            break;
          }
          case ("d") : {
            this.onUp();
            break;
          }
          case ("l") : {
            this.onLeft();
            break;
          }
          case ("r") : {
            this.onRight();
            break;
          }
        }
      }
    }

    if (this.map.distance([this.droneLat, this.droneLng],this.markerCust.getLatLng()) < 100) {
      this.deliverable = true;
    }
    else {
      this.deliverable = false;
    }

    if (this.height > 30 || this.map.distance([this.droneLat, this.droneLng],this.centroid) > 5000) {
      this.loss();
    }
  }

  public loss() : void {
    this.flightState = "Drone Lost. Please Switch To A Different One";
    this.height = 0;
    this.battery = 0;
    this.distance = 0;
    this.markerDrone.setLatLng(this.centroid);
    this.droneLat = -25.7472;
    this.droneLng = 28.2511;
    this.current_operator_id = "null";
    this.is_available = true;
  }

  public deliver() : void {
    this.flightState = "Delivery Complete, Returned To HQ";
    this.height = 0;
    this.battery = 100;
    this.distance = 0;
    this.markerDrone.setLatLng(this.centroid);
    this.droneLat = -25.7472;
    this.droneLng = 28.2511;
    this.current_operator_id = "null";
    this.is_available = true;
  }

  public onUp() : void {
    if (this.height != 0) {
      this.droneLat += 0.0001;
      this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
      this.distance = this.map.distance([this.droneLat, this.droneLng],this.centroid);
      this.distDev = this.map.distance([this.droneLat, this.droneLng],this.markerCust.getLatLng());
      this.checkContact("u");
      this.minuteCalls();
    }
  }

  public onDown() : void {
    if (this.height != 0) {
      this.droneLat -= 0.0001;
      this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
      this.distance = this.map.distance([this.droneLat, this.droneLng],this.centroid);
      this.distDev = this.map.distance([this.droneLat, this.droneLng],this.markerCust.getLatLng());
      this.checkContact("d");
      this.minuteCalls();
    }
  }

  public onRight() : void {
    if (this.height != 0) {
      this.droneLng += 0.0001;
      this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
      this.distance = this.map.distance([this.droneLat, this.droneLng],this.centroid);
      this.distDev = this.map.distance([this.droneLat, this.droneLng],this.markerCust.getLatLng());
      this.checkContact("r");
      this.minuteCalls();
    }
  }

  public onLeft() : void {
    if (this.height != 0) {
      this.droneLng -= 0.0001;
      this.markerDrone.setLatLng([this.droneLat, this.droneLng]);
      this.distance = this.map.distance([this.droneLat, this.droneLng],this.centroid);
      this.distDev = this.map.distance([this.droneLat, this.droneLng],this.markerCust.getLatLng());
      this.checkContact("l");
      this.minuteCalls();
    }
  }

  private setDust() : void {
    var count = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    var LatMax = -25.7016;
    var LngMax = 28.2005;
    var LatMin = -25.7932;
    var LngMin = 28.3023;

    for (var i = 0; i < 10; i++) {
      var dustLat = (Math.random() * (LatMax - LatMin + 0.0001) + LatMin);
      var dustLng = (Math.random() * (LngMax - LngMin + 0.0001) + LngMin);
      this.dustArray[i].setLatLng([dustLat, dustLng]);

      if (this.map.distance([this.droneLat, this.droneLng],[dustLat, dustLng]) < 11) {
        while (this.map.distance([this.droneLat, this.droneLng],[dustLat, dustLng]) < 11) {
          var dustLat = (Math.random() * (LatMax - LatMin + 0.0001) + LatMin);
          var dustLng = (Math.random() * (LngMax - LngMin + 0.0001) + LngMin);
          this.dustArray[i].setLatLng([dustLat, dustLng]);
        }
      }

      if (i > count) {
        this.dustArray[i].setLatLng([0, 0]);
      }
    }
  }

  //Initialisers

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((L) => {
        this.initMap(L);
      });
    }
  }

  private initMap(L: any): void {
      //Map Initialiser
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
    
      //HQ Initialiser
    var iconHQ = L.icon({
      iconUrl: 'https://images.vexels.com/media/users/3/145153/isolated/lists/59e40df1bbed9f4f9b7a8064af57d353-towers-building-silhouette.png',
      iconSize: [30, 30],
    })
    this.markerHQ = L.marker(this.centroid, {icon: iconHQ}).addTo(this.map);
    this.markerHQ.bindPopup("Headquarters").openPopup();

      //Drone Initialiser
    var iconDrone = L.icon({
      iconUrl: 'https://drone4hire.us/wp-content/uploads/2021/11/drone-quad-thin.png',
      iconSize: [38, 38],
    })
    this.markerDrone = L.marker(this.centroid, {icon: iconDrone}).addTo(this.map);
    this.markerDrone.bindPopup("Drone");

      //Customer Initialiser (update for API)
    var iconCust = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/256/9008/9008931.png',
      iconSize: [30, 30],
    })
    this.markerCust = L.marker([-25.7472, 28.27], {icon: iconCust}).addTo(this.map);
    this.markerCust.bindPopup("Customer");

      //Show Distance Limit
    var radius = L.circle(this.centroid, {
    color: 'red',
    fillColor: '#ffffff',
    fillOpacity: 0.1,
    radius: 5000
    }).addTo(this.map);

      //Dust Devil Initialiser
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
  }
}