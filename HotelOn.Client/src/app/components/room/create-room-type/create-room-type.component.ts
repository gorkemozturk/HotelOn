import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-room-type',
  templateUrl: './create-room-type.component.html',
  styleUrls: ['./create-room-type.component.css']
})
export class CreateRoomTypeComponent implements OnInit {
  title: string = 'CREATE A NEW ROOM TYPE';

  constructor(private roomService: RoomService, private fb: FormBuilder, private toastr: ToastrService) { }

  typeForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
    price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
    tax: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
  });

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.roomService.PostRoomType(form.value).subscribe(
      res => {
        this.roomService.GetRoomTypes();
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
