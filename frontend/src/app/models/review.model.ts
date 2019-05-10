
export class Review {

  constructor(
    public id: number,
    public amount: number,
    public comment: string,
    // tslint:disable-next-line:variable-name
    public to_id: number,
    // tslint:disable-next-line:variable-name
    public user_id: number,
    // tslint:disable-next-line:variable-name
    public car_id: number,
    // tslint:disable-next-line:variable-name
    public created_at: Date,
    // tslint:disable-next-line:variable-name
    public updated_at: Date
    ) {

  }

}
