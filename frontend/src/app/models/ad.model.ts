import { Car , City , Score } from './';
import { User } from './user.model';
export class Ad {

  constructor(
    public id: number,
    public description: string,
    // tslint:disable-next-line:variable-name
    public city_id: number,
    // tslint:disable-next-line:variable-name
    public start_date: Date,
    // tslint:disable-next-line:variable-name
    public end_date: Date,
    // tslint:disable-next-line:variable-name
    public score_average: number,
    public price: number,
    public status: number,
    public car: Car,
    public user: User,
    public city: City,
    public score: Score,
    // tslint:disable-next-line:variable-name
    public created_at: Date,
    // tslint:disable-next-line:variable-name
    public updated_at: Date,
    ) {

  }




}
