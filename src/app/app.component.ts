import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { OperoptsComponent } from './operopts/operopts.component';
import { UseroptsComponent } from './useropts/useropts.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IntroComponent, LoginComponent, MapComponent, OperoptsComponent, UseroptsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Homework Assignment - The Anica Collective';
}
