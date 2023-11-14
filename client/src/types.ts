export interface Book {
  title: string;
  author: string;
  rating: number;
  read: boolean;
  startDate: Date | null;
  endDate: Date | null;
  review: string;
  date: Date;
  id?: string;
  uid: string;
  coverNumber: number;
}

export interface Toggle {
  sort: boolean;
  menu: boolean;
  addForm: boolean;
  search: boolean;
  create: boolean;
  user: boolean;
  resetPassword: boolean;
}

export interface BookSearchAPI {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: { cover_i: number }[];
  num_Found: number;
  q: string;
  offset: boolean;
}

export type Docs = { cover_i: number }[] | undefined;

export type Sort = "Title" | "Author" | "Rating" | "Date";

export type Filter = boolean | null;

export type Order = boolean;
