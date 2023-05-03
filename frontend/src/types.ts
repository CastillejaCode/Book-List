export interface Book {
  title: string;
  author: string;
  rating: number;
  review: string;
  id: string;
}

export type Sort = "title" | "author" | "rating" | "recent";

