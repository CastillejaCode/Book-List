export interface Book {
  title: string;
  author: string;
  rating: number;
  review: string;
  id: string;
  date: number;
  uid: string;
  coverNumber: number;
}

export interface Toggle {
  sort: boolean;
  menu: boolean;
  modal: boolean;
  search: boolean;
  create: boolean;
  user: boolean;
}

export type Sort = "title" | "author" | "rating" | "recent";
