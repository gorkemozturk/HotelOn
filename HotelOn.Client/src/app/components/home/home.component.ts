import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'BOOKINGS OVERVIEW';
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.GetRooms();
  }

  setClass(room: Room) {
    let cl;

    if (room.isAvailable == true) {
      cl = 'bg-light';
    } else {
      cl = 'bg-primary text-white';
    }

    return cl;
  }

}
