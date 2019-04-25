import { Role } from './role.model';

export class User {


  constructor(
    public address: string,
    // tslint:disable-next-line:variable-name
    public city_id: number,
    // tslint:disable-next-line:variable-name
    public driving_license_number: string,
    public email: string,
    public id: number,
    public image: string,
    public name: string,
    public role: Role,
    public status: boolean,
    public telephone: string
    ) {

  }

  static dealingRole(roleStr: string): Role {
    if (roleStr === 'CLIENT') {
      return Role.CLIENT;
    }
    if (roleStr === 'PARTNER') {
      return Role.PARTNER;
    }
    if (roleStr === 'ADMIN') {
      return Role.ADMIN;
    }
  }

  isActive(): boolean {
    return this.status;
  }


}
