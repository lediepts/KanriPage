import { Color } from "@material-ui/lab/Alert";
import { Status } from "..";

export type PathParams = {
  [key: string]: string | undefined;
};

export type UI = {
  title: string;
  ipClient?: string;
  user?: User;
  listUser?: User[];
  userEditting?: User;
  recruit?: Recruit[];
  recruitEditting?: Recruit;
  userGetAPIStatus: Status;
  userUpdateAPIStatus: Status;
  recruitGetAPIStatus: Status;
  recruitUpdateAPIStatus: Status;
  isEdit?: boolean;
  messages: {
    key: string;
    type?: Color;
    message: string;
  }[];
};
export type User = {
  _id: string;
  id?: string;
  displayName?: string;
  email?: string;
  givenName?: string;
  surname?: string;
  password?: string;
  role: string;
};
export type Recruit = {
  _id?: string;
  categoryTitle?: string;
  contentsTitle?: string;
  subContent?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  termsOfService?: string;
  created_at?: string;
  updated_at?: string;
};
