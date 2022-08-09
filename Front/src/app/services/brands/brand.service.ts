import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private headers: HttpHeaders; 
  
  API_URL: string = environment.API_URL;
  private accessPointUrl: string = `${this.API_URL}Brand?sort=Name&order=Asc&limit=5&offset=0`;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public get() {
    // Get all jogging data
    return this.http.get(this.accessPointUrl, {headers: this.headers});
  }

  public add(payload:any) {
    return this.http.post(this.accessPointUrl, payload, {headers: this.headers});
  }

  public remove(payload:any) {
    return this.http.delete(this.accessPointUrl + '/' + payload.id, {headers: this.headers});
  }

  public update(payload:any) {
    return this.http.put(this.accessPointUrl + '/' + payload.id, payload, {headers: this.headers});
  }
}