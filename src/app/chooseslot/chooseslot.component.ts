import { Component, OnInit } from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {ChooseslotService} from '../services/chooseslot.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../services/snack-bar.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chooseslot',
  templateUrl: './chooseslot.component.html',
  styleUrls: ['./chooseslot.component.css']
})
export class ChooseslotComponent implements OnInit {

  form: FormGroup;

  constructor(private chooseslotService: ChooseslotService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private snackBarService: SnackBarService) {
    this.form = this.formBuilder.group({
      datepicker:  ['', Validators.required],
      resourceId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onVerify() {
    const dateAvailability = this.form.get('datepicker').value;
    const  dateAvailabilityFormated = this.datePipe.transform(dateAvailability, 'yyyy-MM-ddTHH:mm:ss');
    const resourceId = this.form.get('resourceId').value;
    console.log(dateAvailabilityFormated);
    console.log(resourceId);

    this.chooseslotService.getAvailability(resourceId, dateAvailability).subscribe(res => {
      this.snackBarService.addMessage('This slot is available !');
    },
      error => this.snackBarService.addMessage('Sorry, this slot is taken !')
      );
  }



}
