import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/services/room.service';
import { PaymentOptionService } from 'src/app/services/payment-option.service';
import { PaymentOption } from 'src/app/models/payment-option';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  title: string = 'CREATE A NEW BOOKING';
  paymentOptions: PaymentOption[];

  constructor(private optionService: PaymentOptionService, private roomService: RoomService, private bookingService: BookingService, private fb: FormBuilder, private toastr: ToastrService) { }

  form = this.fb.group({
    bookingName: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
    roomID: ['', Validators.required],
    paymentOptionID: ['', Validators.required],
    duration: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,9}$')])],
    capacity: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,9}$')])],
    startOn: ['', Validators.required],
    isActive: [false],
  });

  ngOnInit() {
    this.roomService.GetRooms();
    this.optionService.GetPaymentOptions().subscribe((res: PaymentOption[]) => this.paymentOptions = res);
  }

  onSubmit(form: NgForm) {
    this.bookingService.PostBooking(form.value).subscribe(
      res => {
        this.bookingService.GetBookings();
        this.toastr.success('You have been inserted the room type successfully.', 'Successfully');
        form.reset();
      },
      err => {
        console.log(err);
        alert(err);
      }
    )
  }

  reset(form: NgForm) {
    form.reset();
  }

}
