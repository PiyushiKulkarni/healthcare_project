import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private apiUrl1 = 'http://localhost:5000/api/data/save-readings';
  private apiUrl2 = 'http://localhost:5000/api/data/set-server';

  constructor(private http: HttpClient) { }
  
 tempdata ={
  "ECG": "0",
  "Spo2": "0",
  "BPM": "0",
  "RoomTemperature": "31.39999962",
  "Humidity": "39.29999924",
  "BodyTemperature": "30.12999916"
}

  
  saveReadings(readings: any): Observable<any> {
    console.log("readings in webservice",this.tempdata);
    
    return this.http.post<any>(this.apiUrl1, this.tempdata);

  }

  getReadings(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/data');
  }
  setServerIPAndPort(ipAddress: string, port: number): Observable<any> {
    return this.http.post<any>(this.apiUrl2, { ipAddress, port });
  }
}
