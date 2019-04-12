export class City {
  constructor(
    // tslint:disable-next-line:variable-name
    public _id: number,
    // tslint:disable-next-line:variable-name
    public _name: string,
    // tslint:disable-next-line:variable-name
    public _description?: string
    ) {

  }


  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }

}
