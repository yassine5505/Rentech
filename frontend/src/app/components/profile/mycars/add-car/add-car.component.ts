import { Component, OnInit } from '@angular/core';
import { CarService } from './../../../../services/shared/car/car.service';
import { Car } from './../../../../models/car.model';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingScreenService } from './../../../../services/shared/loading-screen/loading-screen.service';
import { Router } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  newCarForm: FormGroup;
  submitted = false;
  carBrands: string[] = [];
  carModels: string[] = [];
  carColors: string[] = [];
  carProductionYears: string[] = [];
  carCategories: string[] = [];
  carTransmissions: string[];
  carMotors: string[] = [];
  error = [];
  success = null;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private loaderService: LoadingScreenService
  ) { }

  ngOnInit() {
    this.carBrands = Car.brands;
    this.carCategories = Car.categories;
    this.carMotors = Car.motors;
    this.carColors = Car.colors;
    this.carTransmissions = Car.transmissions;
    const year: number = new Date().getFullYear();
    for (let index = year; index > year - 10 ; index--) {
      this.carProductionYears.push(index.toString());
    }

    this.newCarForm = this.formBuilder.group(
      {
        images: [null, Validators.required],
        model : ['',
            [ Validators.required]
        ],
        brand : ['',
            [ Validators.required]
        ],
        mileage: [ 1 , Validators.required],
        color: [ '' , Validators.required],
        category: [ '' , Validators.required],
        production_year: ['', Validators.required],
        matricule: [null, null],
        transmission: [null, null],
        motor: [null, null],
        airbag: [false, null],
        centralized: [true, null],
        abs: [false, false],
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    this.loaderService.startLoading();
    // stop here if form is invalid
    this.error = [];
    this.success = null;
    if (!this.validateImages()) {
      this.loaderService.stopLoading();
      return;
    }
    const formData = new FormData();
    for (let j = 0; j < this.uploader.queue.length; j++) {
      const fileItem = this.uploader.queue[j]._file;
      console.log(fileItem);
      formData.append('file', fileItem);
    }
    console.log(formData);
    console.log(this.newCarForm);
    this.carService.add(this.newCarForm.value).subscribe(
      data => {
        this.handleResponse(data);
        alert('Yes');
      },
      error => {
        this.loaderService.stopLoading();
        this.handleError(error);
        alert('Yo');
        this.loaderService.stopLoading();
      },
      () => {
        this.loaderService.stopLoading();
      }

    );
}

validateImages(): boolean {
  for (const file of this.uploader.queue) {
    const fileItem = file._file;
    if (fileItem.size > 10000000) {
      this.error.push('Taille des images très grande !');
      alert('Each File should be less than 10 MB of size.');
      return false;
    }
  }
  return true;
}

handleResponse(data) {
  this.router.navigateByUrl('/');
}

handleError(error) {
  this.error = error.message;
}

  processModels(brand) {
    this.carModels = Car.getModels(brand);
  }
}
