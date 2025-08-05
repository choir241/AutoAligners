export interface ILogin {
  email: string;
  name: string;
  password: string;
}

export interface ISignUp extends ILogin{}