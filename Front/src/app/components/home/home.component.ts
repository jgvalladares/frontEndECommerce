import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers

})
export class HomeComponent implements OnInit {
  
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/1500/300`);

  constructor(config: NgbCarouselConfig,private http: HttpClient) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  API_URL: string = environment.API_URL;
  brands: any[] = [];

  ngOnInit(): void {
    this.http.get(`${this.API_URL}Brand?sort=Name&order=Asc&limit=5&offset=0`).subscribe(
      (response: any) => {
        console.log(response);
        this.brands = response;
      }
  
    )
  }//fin ng onint
  


}
