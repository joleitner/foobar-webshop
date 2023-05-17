export default class Orders {
  private orderList;

  constructor() {
    // Retrieve orders from localStorage or initialize to an empty array
    // let storedOrders;
    // if (typeof window !== 'undefined') {
    const storedOrders = localStorage.getItem('orders');
    // }
    this.orderList = storedOrders ? JSON.parse(storedOrders) : [];
  }

  public getOrders() {
    return this.orderList;
  }

  public add(orderId: string): void {
    if (orderId) {
      this.orderList.push(orderId);
    }
    localStorage.setItem('orders', JSON.stringify(this.orderList));
  }
}
