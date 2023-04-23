export type Article = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type Cart = {
  [key: number]: {
    article: Article;
    amount: number;
  };
};
