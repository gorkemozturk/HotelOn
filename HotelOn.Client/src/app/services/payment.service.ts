import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly url = 'https://localhost:44316/api/payments/';
  
  payments: Payment[];

  constructor(private http: HttpClient) { }

  GetPayments(id: number) {
    return this.http.get(this.url + id).toPromise().then(res => this.payments = res as Payment[]);
  }

  PutPayment(payment: Payment) {
    return this.http.put(this.url + payment.id, payment);
  }

}
