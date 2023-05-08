export interface Book {
  title: string;
  author: string;
  rating: number;
  review: string;
  id: string;
  date: number;
  uid: string;
}

export type Sort = "title" | "author" | "rating" | "recent";
