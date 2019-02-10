import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookings: Booking[];
  booking: Booking;

  private readonly url = 'https://localhost:44316/api/bookings/';

  constructor(private http: HttpClient) { }

  GetBookings() {
    return this.http.get(this.url).toPromise().then(res => this.bookings = res as Booking[]);
  }

  GetBooking(id: number) {
    return this.http.get(this.url + id).toPromise().then(res => this.booking = res as Booking);
  }

  PostBooking(booking: Booking) {
    return this.http.post(this.url, booking);
  }

  DeleteBooking(id: number) {
    return this.http.delete(this.url + id);
  }

  PutBooking(booking: Booking) {
    return this.http.put(this.url + booking.id, booking);
  }
}
