import Link from 'next/link';
import { ShoppingCart, Sun, Moon } from 'react-feather';

export default function Navbar() {
  let darkmode = false;

  function toggleTheme() {
    darkmode = !darkmode;
    //document.body.classList.toggle('dark-mode');
  }

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

        {/* <li>
          <Link href="#" role="button" className={'outline'}>
            Login
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
