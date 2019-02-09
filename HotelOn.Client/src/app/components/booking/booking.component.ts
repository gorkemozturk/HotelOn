import { Component, OnInit } from '@angular/core';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentComponent } from '../payment/payment.component';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  title: string = 'BOOKINGS';
  constructor(private paymentService: PaymentService, private bookingService: BookingService, private dialog: MatDialog, private toastr: ToastrService) { }

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

}
