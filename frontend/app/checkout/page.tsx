export default function CheckoutPage() {
  return (
    <>
      <h3>Checkout</h3>
      <article>
        <form>
          <h4>Personal details</h4>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          <h4>Shipping Address</h4>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" required />
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" required />
          <label htmlFor="zip">Zip</label>
          <input type="text" name="zip" id="zip" required />
          <h4>Payment details</h4>
          <label htmlFor="card">Card</label>
          <input type="text" name="card" id="card" required />
          <button
            type="submit"
            className="cont"
            onClick="event.preventDefault()"
          >
            Pay and Checkout
          </button>
        </form>
      </article>
    </>
  );
}
