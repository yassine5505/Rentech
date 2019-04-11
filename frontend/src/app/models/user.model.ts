import { Role } from './role.model';

export class User {


  constructor(
    private username: string,
    private id?: number,
    private email?: string,
    private firstName?: string,
    private lastName?: string,
    private role?: Role,
    private token?: string) {

  }

}
