import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RoomComponent } from './components/room/room.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RoomService } from './services/room.service';
import { CreateRoomTypeComponent } from './components/room/create-room-type/create-room-type.component';
import { CreateRoomComponent } from './components/room/create-room/create-room.component';
import { PaymentOptionComponent } from './components/payment-option/payment-option.component';
import { BookingComponent } from './components/booking/booking.component';
import { PaymentOptionService } from './services/payment-option.service';
import { BookingService } from './services/booking.service';
import { CreateBookingComponent } from './components/booking/create-booking/create-booking.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'rooms',
    component: RoomComponent
  },
  {
    path: 'payment-options',
    component: PaymentOptionComponent
  },
  {
    path: 'bookings',
    component: BookingComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CreateRoomTypeComponent,
    CreateRoomComponent,
    PaymentOptionComponent,
    BookingComponent,
    CreateBookingComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    RoomService,
    PaymentOptionService,
    BookingService
  ],
  entryComponents: [
    CreateRoomTypeComponent,
    CreateRoomComponent,
    CreateBookingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
