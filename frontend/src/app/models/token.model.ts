import { Role , User } from '.';

export class Token {


  constructor(
    // tslint:disable-next-line:variable-name
    public access_token: string,
    // tslint:disable-next-line:variable-name
    public expires_in: number,

    // tslint:disable-next-line:variable-name
    public token_type: string,
    public user: User
    ) {

  }

}
