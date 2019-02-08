import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentOption } from '../models/payment-option';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionService {
  private readonly url = 'https://localhost:44316/api/paymentoptions/';

  constructor(private http: HttpClient) { }

  GetPaymentOptions() {
    return this.http.get(this.url);
  }

  PostPaymentOption(option: PaymentOption) {
    return this.http.post(this.url, option);
  }

  DeletePaymentOption(id: number) {
    return this.http.delete(this.url + id);
  }
}
