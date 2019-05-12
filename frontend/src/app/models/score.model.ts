import { Ad } from './ad.model';

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
    // tslint:disable-next-line:variable-name
    public created_at: Date,
    // tslint:disable-next-line:variable-name
    public updated_at: Date,
    public ad: Ad
    ) {

  }

}
