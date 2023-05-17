import CartList from './CartList';
import Link from 'next/link';
import { File, ArrowRight } from 'react-feather';

export default function CartPage() {
  return (
    <div>
      <h3>Cart</h3>
      <CartList />
      <div className="right padding-40">
        <Link href="/orders" className="secondary">
          <File /> previous orders <ArrowRight />
        </Link>{' '}
      </div>
    </div>
  );
}
