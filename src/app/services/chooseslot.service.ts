import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DateTimeInterface} from '../models/datetime';

@Injectable({
  providedIn: 'root'
})
export class ChooseslotService {

  constructor(private httpClient: HttpClient) { }

  path = 'http://localhost:8080/resource';

  getAvailability(id: number, datetime) {
    return this.httpClient.get<DateTimeInterface>(this.path + '/' + id + '/availabilty', {params: datetime});
  }

  postReservation(id: number, startDatetime: string, endDatetime: string) {
    return this.httpClient.post<boolean>(this.path + '/' + id + '/reserve', {startDatetime, endDatetime});
  }
}
