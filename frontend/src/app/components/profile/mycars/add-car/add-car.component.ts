import { Component, OnInit } from '@angular/core';
import { CarService } from './../../../../services/shared/car/car.service';
import { Car } from './../../../../models/car.model';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingScreenService } from './../../../../services/shared/loading-screen/loading-screen.service';
import { Router } from '@angular/router';

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
  error: string[] = [];
  success = null;
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
        images: null,
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      this.newCarForm.get('images').setValue(file);
    }
    console.log(this.newCarForm);
  }

  onSubmit() {
    this.submitted = true;
    this.loaderService.startLoading();
    if (!this.validateImages()) {
      this.loaderService.stopLoading();
      return;
    }

    if (this.newCarForm.invalid) {
      this.loaderService.stopLoading();
      this.error.push('Certaines informations du formulaire sont invalides !');
      return;
    }
    // tslint:disable-next-line:prefer-const
    let formData: FormData = new FormData();
    Object.keys(this.newCarForm.value).forEach(
      key => {
        if (['airbag', 'abs', 'centralized'].indexOf(key) > -1) {
          formData.append( key, (this.newCarForm.get(key).value === true) ? '1' : '0');
          return;
        }
        formData.append( key, this.newCarForm.get(key).value);
      }
    );

    Object.values(this.newCarForm.get('images').value).forEach(
      (file: File) => {
        formData.append( 'images[]', file, file.name );
      }
    );
    formData.delete('images');
    this.carService.add(formData).subscribe(
      data => {
        this.handleResponse(data);
      },
      error => {
        this.handleError(error);
        this.loaderService.stopLoading();
      },
      () => {
        this.loaderService.stopLoading();
      }
    );
}

validateImages(): boolean {
  const carImages = this.newCarForm.get('images');
  if (carImages.value == null || carImages.value.length < 1) {
    this.error.push('Vous devez specifier au moins une image !');
    return false;
  }
  for (const fileItem of this.newCarForm.get('images').value) {
    if (fileItem.size > 10000000) {
      this.error.push('Taille des images très grande (max 10M) !');
      return false;
    }
  }
  return true;
}

handleResponse(data) {
  this.success = data.message;
}

handleError(error) {
  this.error = error.message;
}

  processModels(brand) {
    this.carModels = Car.getModels(brand);
  }
}
