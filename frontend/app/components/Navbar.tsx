import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { ShoppingCart } from 'react-feather';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <strong>
            <Link href="/" className="no-style">
              FooBar Webshop
            </Link>
          </strong>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        </li>
        <li>
          <ThemeToggle />
        </li>

        {/* <li>
          <Link href="#" role="button" className={'outline'}>
            Login
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
