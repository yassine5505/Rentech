import { Role } from './role.model';
import { Car } from './car.model';
import { City } from './city.model';
import { Score } from './score.model';

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
    public telephone: string,
    // tslint:disable-next-line:variable-name
    public city?: City,
    public cars?: Car[],
    // tslint:disable-next-line:variable-name
    public score_average?: number,
    public scores?: Score
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

  isActive() {
    return this.status;
  }

  isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }
  isClient(): boolean {
    return this.role === Role.CLIENT;
  }
  isPartner(): boolean {
    return this.role === Role.PARTNER;
  }

  isVisitor(): boolean {
    return !this.isAdmin && !this.isPartner && !this.isClient;
  }

}
