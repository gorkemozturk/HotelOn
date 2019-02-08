import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  title: string = 'CREATE A NEW ROOM';

  constructor(private fb: FormBuilder, private roomService: RoomService, private toastr: ToastrService) { }

  roomForm = this.fb.group({
    roomNumber: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,9}$')])],
    roomTypeID: ['', Validators.compose([Validators.required])],
    isAvailable: [false],
  });

  ngOnInit() {
    this.roomService.GetRoomTypes();
  }

  onSubmit(form: NgForm) {
    this.roomService.PostRoom(form.value).subscribe(
      res => {
        this.roomService.GetRooms();
        this.toastr.success('You have been inserted the room successfully.', 'Successfully');
        this.roomForm.reset({
          roomNumber: '',
          roomTypeID: '',
          isAvailable: false
        });
      },
      err => {
        console.log(err);
        alert(err);
      }
    )
  }

  reset(form: NgForm) {
    form.reset({
        roomNumber: '',
        roomTypeID: '',
        isAvailable: false
      }
    );
  }

}
