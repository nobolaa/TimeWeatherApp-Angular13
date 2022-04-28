import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'weather', loadChildren: () => import('./pages/weather/weather.module').then(m => m.WeatherModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }