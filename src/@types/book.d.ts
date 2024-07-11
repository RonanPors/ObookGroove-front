export type Book = {
  isbn: number | string;
  title: string;
  authors: string[];
  publishedDate: string;
  mainCategory: string;
  categories: string[];
  description: string;
  pageCount: number;
  artistName: string; //! à retirer plus tart
  images: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  };

  // de la BDD
  author: string;
  cover: string;
  genre: string[];
  id: number;
  numberOfPages: number;
  resume: string;
  year: number;
};
