import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateRoomTypeComponent } from './create-room-type/create-room-type.component';
import { ToastrService } from 'ngx-toastr';
import { CreateRoomComponent } from './create-room/create-room.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private roomService: RoomService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.roomService.GetRoomTypes();
    this.roomService.GetRooms();
  }

  openTypeDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '350px';

    this.dialog.open(CreateRoomTypeComponent, dialogConfig);
  }

  openRoomDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '350px';

    this.dialog.open(CreateRoomComponent, dialogConfig);
  }

  onTypeDelete(id: number) {
    if (confirm('Are you sure to delete this room type?')) {
      this.roomService.DeleteRoomType(id).subscribe(
        res => {
          this.roomService.GetRoomTypes();
          this.toastr.success('You have been deleted the room type successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  onRoomDelete(id: number) {
    if (confirm('Are you sure to delete this room?')) {
      this.roomService.DeleteRoom(id).subscribe(
        res => {
          this.roomService.GetRooms();
          this.toastr.success('You have been deleted the room successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}
