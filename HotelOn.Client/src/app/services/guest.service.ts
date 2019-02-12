import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private readonly url = 'https://localhost:44316/api/guests/';

  guests: Guest[];

  constructor(private http: HttpClient) { }

  GetGuests(id: number) {
    return this.http.get(this.url + id).toPromise().then(res => this.guests = res as Guest[]);
  }

  PostGuest(id: number, guest: Guest) {
    return this.http.post(this.url + id, guest);
  }

  DeleteGuest(guest: Guest) {
    return this.http.delete(this.url + guest.id);
  }
}
