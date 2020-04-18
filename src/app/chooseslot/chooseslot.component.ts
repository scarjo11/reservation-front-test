import { Component, OnInit } from '@angular/core';
import {ChooseslotService} from '../services/chooseslot.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../services/snack-bar.service';
import * as moment from 'moment';
import {Constants} from '../models/constants';

@Component({
  selector: 'app-chooseslot',
  templateUrl: './chooseslot.component.html',
  styleUrls: ['./chooseslot.component.scss']
})
export class ChooseslotComponent implements OnInit {

  form: FormGroup;
  resourceId = Constants.RESOURCE_ID;
  availability: boolean;
  date = new Date();

  constructor(private chooseSlotService: ChooseslotService,
              private formBuilder: FormBuilder,
              private snackBarService: SnackBarService) {
    this.form = this.formBuilder.group({
      datepicker:  ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onVerify() {
    const dateAvailability = this.form.value;
    // const datetime = this.datePipe.transform(dateAvailability, 'yyyy-MM-ddTHH:mm:ss');
    const datetime = moment(dateAvailability.datepicker).format('YYYY-MM-DDThh:mm:ss');
    console.log(datetime);

    this.chooseSlotService.getAvailability(this.resourceId, {datetime}).subscribe((availability: boolean) => {
      this.availability = availability;
      console.log(availability);
      this.snackBarService.addMessage('This slot is available !');
    },
      error => this.snackBarService.addMessage('Sorry, this slot is taken !')
      );
  }



}
