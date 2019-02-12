import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { GuestService } from 'src/app/services/guest.service';
import { Guest } from 'src/app/models/guest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  title: string = 'GUESTS';

  constructor(private guestService: GuestService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onDelete(guest: Guest) {
    if (confirm('Are you sure to delete this guest?')) {
      this.guestService.DeleteGuest(guest).subscribe(
        res => {
          const index = this.guestService.guests.indexOf(guest);
          this.guestService.guests.splice(index, 1);
          this.toastr.success('You have been deleted the guest successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}
