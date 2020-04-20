import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DateTimeInterface} from '../models/datetime.interface';

@Injectable({
  providedIn: 'root'
})
export class ChooseSlotService {

  constructor(private httpClient: HttpClient) { }

  path = 'http://localhost:8080/resource';

  getAvailability(id: number, datetime) {
    return this.httpClient.get<DateTimeInterface>(this.path + '/' + id + '/availabilty', {params: datetime});
  }

  postReservation(id: number, data) {
    return this.httpClient.post<any>(this.path + '/' + id + '/reserve', data);
  }
}
