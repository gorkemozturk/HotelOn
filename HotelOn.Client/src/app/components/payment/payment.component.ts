import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  title: string = 'PAYMENTS';

  constructor(private paymentService: PaymentService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onToggle(payment: Payment) {
    if (confirm('Are you sure to continue your process?')) {
      this.paymentService.PutPayment(payment).subscribe(
        (res: Payment) => {
          payment.isDone = !payment.isDone;
          if (payment.isDone == true) {
            this.toastr.success('You have been confirmed the payment successfully.', 'Successfully');
          } else {
            this.toastr.success('You hava been revoked the payment successfully.', 'Successfully');
          }
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  setClass(payment: Payment) {
    let cl = {
      'table-success': payment.isDone
    }

    return cl;
  }

}
