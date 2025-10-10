export interface IUser {
  name: string;
  email: string;
  password: string;
  adminCode: string;
}

export interface IUpdateUser {
  name: string;
  email: string;
  password?: string;
}

export interface IEditUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
