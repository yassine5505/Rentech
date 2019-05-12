import { Score } from './score.model';

export class Car {

  public static brands = [
    'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti',
    'Buick', 'Cadillac', 'Chevrolet', 'Chrysler',
    'Citroen', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Geely', 'General Motors',
     'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia Motors',
     'Kia', 'Koenigsegg', 'Lamborghini', 'Land Rover', 'Lexus', 'Maserati',
     'Mazda', 'McLaren', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan',
     'Pagani', 'Peugeot', 'Porsche', 'Ram', 'Renault', 'Rolls Royce',
     'Saab', 'Subaru', 'Suzuki', 'Tata Motors', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
  ];

  public static models = [
    [
      'CL_MODELS',
      '2.2CL',
      '2.3CL',
      '3.0CL'
    ],
    [
      'ALFA164',
      'ALFA8C',
      'ALFAGT',
      'MIL',
      'SPID',
      'ALFAOTH',
    ],
  ];

  public static categories = [
    'CITADINE',
    'BERLINE',
    'MONOSPACE',
    '4X4/ SUV',
    'CABRIOLET',
    'SPORTIVE'
  ];

  public static  motors = [
    'DIESEL',
    'GASOIL',
    'GPL/ GNV',
    'BIOCARBURANT',
    'ELECTRIQUE',
    'HYBRIDE'
  ];

  public static colors: string [] = [
    'blue', 'black', 'green', 'grey', 'olive', 'orange', 'red', 'violet', 'white', 'yellow'
  ];

  public static transmissions: string [] = [
    'TRANSMISSION AVANT',
    'TRANSMISSION ARRIÈRE',
    'TRANSMISSION INTÉGRALE',
  ];

  constructor(
    public id: number,
    public brand: string,
    public model: string,
    // tslint:disable-next-line:variable-name
    public user_id: number,
    public airbag: boolean = false,
    public centralized: boolean = false,
    public abs: boolean = false,
    public images,
    // tslint:disable-next-line:variable-name
    public production_year?: string,
    public mileage?: number,
    public color?: string,
    public category?: string,
    public matricule?: string,
    public transmission?: string,
    public motor?: string,
    public score?: Score,
    ) {

  }

  public static getModels( car: string = null): string[] {
    const index = Object.values(Car.brands).indexOf(car);
    return index > -1 && index < Car.models.length ? Car.models[index] : ['DEFAULT'];
  }



}
