import { IBaseModel } from "./IBase";

export interface IUserData {
  _id: string;
  username: string;
  email: string;
  password?: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IUserInput {
  username: string;
  email: string;
  password: string;
}



export interface IUserModel extends IBaseModel {
  username: string;
  email: string;
  password: string;
  pin : string,
  phone : string,
  address : string
}
