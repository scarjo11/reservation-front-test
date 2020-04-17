import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChooseslotService {

  constructor(private httpClient: HttpClient) { }

  path = 'http://localhost:8080/resource';

  getAvailability(id: number, date: Date) {
    return this.httpClient.get<any>(this.path + '/' + id + '/availabilty');
  }

  /*post(data) {
    return this.httpClient.post<UserInterface>(this.path, data);
  }*/
}
