import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { GuestService } from 'src/app/services/guest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-guest',
  templateUrl: './create-guest.component.html',
  styleUrls: ['./create-guest.component.css']
})
export class CreateGuestComponent implements OnInit {
  title: string = 'CREATE A NEW GUEST';
  constructor(private bookingService: BookingService, private fb: FormBuilder, private guestService: GuestService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  form = this.fb.group({
    firstName: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
    lastName: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
    email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(35)])],
    phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,15}$')])],
    address: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
  });

  onSubmit(id: number, form: NgForm) {
    this.guestService.PostGuest(id, form.value).subscribe(
      res => {
        this.toastr.success('You have been inserted the guest successfully.', 'Successfully');
      },
      err => {
        alert(err);
        console.log(err)
      }
    );
  }
}
