import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class NodosService {
  
private url = 'http://localhost:8080/api/grafos';
  constructor(private http: HttpClient) {
   
    this.getJSON().subscribe(data => {
      console.log(data);
  });

   }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/test1.json");
  }

  public getNodos(): Observable<any> {
    return this.http.get(this.url);
  }

}
