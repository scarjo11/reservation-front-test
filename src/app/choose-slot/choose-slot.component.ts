import {Component, OnInit} from '@angular/core';
import {ChooseSlotService} from './services/choose-slot.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../core/services/snack-bar.service';
import * as moment from 'moment';
import {Constants} from './models/constants';
import {DateTimeInterface} from './models/datetime.interface';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-choose-slot',
  templateUrl: './choose-slot.component.html',
  styleUrls: ['./choose-slot.component.scss']
})
export class ChooseSlotComponent {

  formDate: FormGroup;
  formTime: FormGroup;
  resourceId = Constants.RESOURCE_ID;
  availability: boolean;
  dateToSend = '';

  constructor(
    private chooseSlotService: ChooseSlotService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService
  ) {
    this.formDate = this.formBuilder.group({
      datepicker:  ['', Validators.required],
    });

    this.formTime = this.formBuilder.group({
      startDatetime:  ['', Validators.required],
      endDatetime:  ['', Validators.required],
    });
  }

  onVerify() {
    const dateAvailability = this.formDate.value;
    this.dateToSend = moment(dateAvailability.datepicker).format('YYYY-MM-DDThh:mm:ss');
    const datetime = this.dateToSend;

    this.chooseSlotService.getAvailability(this.resourceId, {datetime})
      .pipe(take(1))
      .subscribe((availability: DateTimeInterface) => {
          this.availability = availability.available;
          if (!!this.availability) {
            this.snackBarService.addMessage('This date is available !');
            return;
          }
          this.snackBarService.addMessage('Oups, you can\'t take this date...');
        },
        errorMessage => this.snackBarService.addMessage(errorMessage.error.error)
      );
  }

  onSubmit(){
    this.chooseSlotService.postReservation(this.resourceId, this.dataFormattedBeforeSend(this.formTime.value))
      .pipe(take(1))
      .subscribe((response: DateTimeInterface) => {
          if (!!response.success) {
            this.snackBarService.addMessage('Your slot has been booked with success !!!');
            this.availability = false;
            this.formDate.reset();
            this.formTime.reset();
            return;
          }
          this.snackBarService.addMessage('Oups, you are not allowed to take this slot...');
        }, errorMessage => this.snackBarService.addMessage(errorMessage.error.error)
      );
  }

  dataFormattedBeforeSend(values) {
    const mStartDatetime = moment(values.startDatetime, 'hh:mm:ss');
    const mEndDatetime = moment(values.endDatetime, 'hh:mm:ss');

    const startDatetime = moment(this.dateToSend)
      .set({
        hour: mStartDatetime.get('hour'),
        minute: mStartDatetime.get('minute'),
        second: mStartDatetime.get('second')
      })
      .format('YYYY-MM-DDTHH:mm:ss');

    const endDatetime = moment(this.dateToSend)
      .set({
        hour: mEndDatetime.get('hour'),
        minute: mEndDatetime.get('minute'),
        second: mEndDatetime.get('second')
      })
      .format('YYYY-MM-DDTHH:mm:ss');

    return {startDatetime, endDatetime};
  }
}
