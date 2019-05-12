import { Ad } from './ad.model';
import { User } from './user.model';
import { Booking } from './booking.model';

export class Score {

  constructor(
    public id: number,
    public amount: number,
    // tslint:disable-next-line:variable-name
    public to_id: number,
    // tslint:disable-next-line:variable-name
    public user_id: number,
    // tslint:disable-next-line:variable-name
    public positive_comment: string,
    // tslint:disable-next-line:variable-name
    public negative_comment: string,
    // tslint:disable-next-line:variable-name
    public ad_id: number,
    // tslint:disable-next-line:variable-name
    public score_count: number,
    // tslint:disable-next-line:variable-name
    public score_average: number,
    public scores: Score[],
    // tslint:disable-next-line:variable-name
    public reservation: Booking,
    // tslint:disable-next-line:variable-name
    public user_info: User,
    // tslint:disable-next-line:variable-name
    public created_at: Date,
    // tslint:disable-next-line:variable-name
    public updated_at: Date,
    public ad: Ad
    ) {

  }

}
