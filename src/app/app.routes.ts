import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MapComponent } from './map/map.component';
import { OperoptsComponent } from './operopts/operopts.component';
import { UseroptsComponent } from './useropts/useropts.component';

export const routes: Routes = [
    {path: 'user', component: UseroptsComponent},
    {path: 'op', component: OperoptsComponent},
    {path: 'main', component: IntroComponent},
    {path: 'map', component: MapComponent},
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    }
];