import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from './pages/weather/services/weather.service';
import { WeatherData } from './shared/interfaces/weather.interface';
import { GeoLocationService } from './shared/services/geo-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  public weather$!: Observable<WeatherData>;

  constructor(private weatherSvc: WeatherService, private readonly getLocationSvc: GeoLocationService){
  }
  
  ngAfterViewInit(): void {
    if(navigator?.geolocation){
      this.getLocation();
    }
  }

  public onInputSent(city: string): void{
    this.weather$ = this.weatherSvc.getWeatherByName(city);
  }

  private async getLocation():Promise<void>{
    try{

      const {coords} = await this.getLocationSvc.getCurrentPosition();
      this.weather$ = this.weatherSvc.getWeatherByCoords(coords);

    }catch(error){
      console.log(error);
    }
  }
}