import { Cart, Article } from '../types';

export default class ShoppingCart {
  private cart: Cart;

  constructor() {
    // Retrieve cart from localStorage or initialize to an empty object
    let storedCart;
    if (typeof window !== 'undefined') {
      storedCart = localStorage.getItem('shopping-cart');
    }

    this.cart = storedCart ? JSON.parse(storedCart) : {};
  }

  public getCart(): Cart {
    return this.cart;
  }

  public add(article: Article): void {
    // article is already in cart
    if (article?.id in this.cart) {
      this.cart[article.id].amount += 1;

      // if article is not in cart
    } else {
      this.cart[article.id] = {
        article,
        amount: 1,
      };
    }
    localStorage.setItem('shopping-cart', JSON.stringify(this.cart));
  }

  public delete(articleId: number): void {
    delete this.cart[articleId];
    localStorage.setItem('shopping-cart', JSON.stringify(this.cart));
  }

  public empty(): void {
    this.cart = {};
    localStorage.setItem('shopping-cart', JSON.stringify(this.cart));
  }

  public isEmpty(): boolean {
    return Object.keys(this.cart).length === 0;
  }

  public calculateCartTotal(): string {
    let total = 0;
    Object.keys(this.cart).forEach((key) => {
      const articleId = parseInt(key);
      if (typeof articleId === 'number') {
        total +=
          this.cart[articleId].article.price * this.cart[articleId].amount;
      }
    });
    return total.toFixed(2);
  }
}
