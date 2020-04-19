import { Component, OnInit } from '@angular/core';
import {ChooseslotService} from '../services/chooseslot.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../services/snack-bar.service';
import * as moment from 'moment';
import {Constants} from '../models/constants';
import {DateTimeInterface} from '../models/datetime';

@Component({
  selector: 'app-chooseslot',
  templateUrl: './chooseslot.component.html',
  styleUrls: ['./chooseslot.component.scss']
})
export class ChooseslotComponent implements OnInit {

  formDate: FormGroup;
  formTime: FormGroup;
  resourceId = Constants.RESOURCE_ID;
  availability: boolean;

  constructor(private chooseSlotService: ChooseslotService,
              private formBuilder: FormBuilder,
              private snackBarService: SnackBarService) {
    this.formDate = this.formBuilder.group({
      datepicker:  ['', Validators.required],
    });

    this.formTime = this.formBuilder.group({
      startTimePicker:  ['', Validators.required],
      endTimePicker:  ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onVerify() {
    const dateAvailability = this.formDate.value;
    // const datetime = this.datePipe.transform(dateAvailability, 'yyyy-MM-ddTHH:mm:ss');
    const datetime = moment(dateAvailability.datepicker).format('YYYY-MM-DDThh:mm:ss');
    console.log(datetime);

    this.chooseSlotService.getAvailability(this.resourceId, {datetime}).subscribe((availability: DateTimeInterface) => {
      this.availability = availability.available;
      if (!!this.availability) {
        this.snackBarService.addMessage('This date is available !');
        console.log(availability);
        return;
      }
      this.snackBarService.addMessage('Oups, you can\'t take this date...');
      console.log(availability);
    },
      error => this.snackBarService.addMessage('Sorry, an error occcured !')
      );
  }

  onSubmit(){
    const dateAvailability = this.formDate.value;
    console.log(dateAvailability);
  }



}
