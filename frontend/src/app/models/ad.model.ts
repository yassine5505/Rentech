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
    public price: number,
    public status: boolean
    ) {

  }



}
