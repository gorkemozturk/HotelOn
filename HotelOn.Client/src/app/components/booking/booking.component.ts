import { Component, OnInit } from '@angular/core';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentService } from 'src/app/services/payment.service';
import { Booking } from 'src/app/models/booking';
import { CreateGuestComponent } from '../guest/create-guest/create-guest.component';
import { GuestComponent } from '../guest/guest.component';
import { GuestService } from 'src/app/services/guest.service';
import { Guest } from 'src/app/models/guest';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  title: string = 'BOOKINGS';

  constructor(private paymentService: PaymentService, private bookingService: BookingService, private dialog: MatDialog, private toastr: ToastrService, private guestService: GuestService) { }

  ngOnInit() {
    this.bookingService.GetBookings();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '350px';

    this.dialog.open(CreateBookingComponent, dialogConfig);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure to delete this booking?')) {
      this.bookingService.DeleteBooking(id).subscribe(
        res => {
          this.toastr.success('You have been deleted the booking successfully.', 'Successfully');
          this.bookingService.GetBookings();
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  openPaymentDialog(id: number): void {
    this.paymentService.GetPayments(id);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '450px';

    this.dialog.open(PaymentComponent, dialogConfig);
  }

  openRegistrationGuestDialog(id: number): void {
    this.bookingService.GetBooking(id);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '450px';

    this.dialog.open(CreateGuestComponent, dialogConfig);
  }

  openGuestDialog(id: number): void {
    this.guestService.GetGuests(id);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '450px';

    this.dialog.open(GuestComponent, dialogConfig);
  }

  onToggle(booking: Booking): void {
    if (confirm('Are you sure to continue your process?')) {
      this.bookingService.PutBooking(booking).subscribe(
        (res: Booking) => {
          booking.isActive = !booking.isActive;
          if (booking.isActive == true) {
            this.toastr.success('You have been confirmed the booking successfully.', 'Successfully');
          } else {
            this.toastr.success('You hava been revoked the booking successfully.', 'Successfully');
          }
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  setClass(booking: Booking) {
    let cl = {
      'table-success': booking.isActive
    }

    return cl;
  }

}
