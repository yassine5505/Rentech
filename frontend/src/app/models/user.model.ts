
export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token?: string;

  constructor(username: string) {
    this.username = username;
  }

}
