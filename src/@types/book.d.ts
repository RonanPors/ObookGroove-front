export type Book = {
  isbn: number;
  title: string;
  authors: string[];
  publishedDate: string;
  mainCategory: string;
  categories: string[];
  description: string;
  pageCount: number;
  images: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  };
};
