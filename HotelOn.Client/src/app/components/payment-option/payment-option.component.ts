import { Component, OnInit } from '@angular/core';
import { PaymentOptionService } from 'src/app/services/payment-option.service';
import { PaymentOption } from 'src/app/models/payment-option';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.component.html',
  styleUrls: ['./payment-option.component.css']
})
export class PaymentOptionComponent implements OnInit {
  paymentOptions: PaymentOption[];
  title: string = 'PAYMENT OPTIONS';

  constructor(private optionService: PaymentOptionService, private toastr: ToastrService, private fb: FormBuilder) { }

  form = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
    ratio: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
    index: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,9}$')])],
  });

  ngOnInit() {
    this.optionService.GetPaymentOptions().subscribe((res: PaymentOption[]) => this.paymentOptions = res);
  }

  onSubmit(form: NgForm) {
    this.optionService.PostPaymentOption(form.value).subscribe(
      (res: PaymentOption) => {
        this.paymentOptions.push(res);
        this.toastr.success('You have been inserted the payment option successfully.', 'Successfully');
        form.reset();
      },
      err => {
        console.log("An error occurred.")
        alert(err);
      }
    );
  }

  onDelete(id:number, option: PaymentOption) {
    if (confirm('Are you sure to delete this payment option?')) {
      this.optionService.DeletePaymentOption(id).subscribe(
        res => {
          const index = this.paymentOptions.indexOf(option);
          this.paymentOptions.splice(index, 1);
          this.toastr.warning('You have been deleted the payment option successfully.', 'Successfully');
        },
        err => {
          console.log("An error occurred.")
          alert(err);
        }
      );
    }
  }

  reset(form: NgForm) {
    form.reset();
  }

}
