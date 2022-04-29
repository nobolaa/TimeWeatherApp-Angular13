import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from './pages/weather/services/weather.service';
import { WeatherData } from './shared/interfaces/weather.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public weather$!: Observable<WeatherData>;

  constructor(private weatherSvc: WeatherService){}

  public onInputSent(city: string): void{
    this.weather$ = this.weatherSvc.getWeatherByName(city);
  }
}