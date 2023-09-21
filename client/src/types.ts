export interface Book {
  title: string;
  author: string;
  rating: number;
  review: string;
  id?: string;
  date: number;
  uid: string;
  coverNumber: number;
  read: boolean;
}

export interface Toggle {
  sort: boolean;
  menu: boolean;
  modal: boolean;
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

export type Sort = "title" | "author" | "rating" | "recent";
