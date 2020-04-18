import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChooseslotService {

  constructor(private httpClient: HttpClient) { }

  path = 'http://localhost:8080/resource';

  getAvailability(id: number, datetime) {
    return this.httpClient.get<boolean>(this.path + '/' + id + '/availabilty', {params: datetime});
  }

  /*post(data) {
    return this.httpClient.post<UserInterface>(this.path, data);
  }*/
}
