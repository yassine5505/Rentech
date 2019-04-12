import { Role } from './role.model';

export class User {


  constructor(
    public username: string,
    public id?: number,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public role?: Role,
    public token?: string) {

  }


}
