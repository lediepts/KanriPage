import { Status } from "..";

export type NewsState = {
  newslist?: News[];
  APIGetNewsStatus?: Status;
  APIUpdateNewsStatus?: Status;
  newsEditting?: News;
  isEdit?: boolean;
};

export type News = {
  id?: string;
  title?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  content?: string;
  display_date?: string;
  thumbnail?: string;
  created_at?: string;
  updated_at?: string;
};
