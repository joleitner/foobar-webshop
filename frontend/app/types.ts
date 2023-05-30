import { type } from 'os';

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

export type Order = {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  status: string;
  sum: number;
  invoice: string;
  deliveryStatus: string;
  deliveryMessage: string;
};
