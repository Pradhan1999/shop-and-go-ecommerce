import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';


const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const router = useRouter();
  const arrayPaths = ['/'];

  const [onTop, setOnTop] = useState((!arrayPaths.includes(router.pathname)) ? false : true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  }

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname)) {
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const closeSearch = () => {
    setSearchOpen(false);
  }

  // on click outside
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? 'site-header--fixed' : ''}`}>
      <div className="container">
        <Link href="/">
          <a>
            <Image
              src="/images/FinalLogo.png"
              alt="Logo"
              width={120}
              height={65}
            />
          </a>
        </Link>

        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}>
        </nav>

        <div className="site-header__actions">
          <button type='button' ref={searchRef} className={`search-form-wrapper ${searchOpen ? 'search-form--active' : ''}`}>
            <form className={`search-form`}>
              <i className="icon-cancel" onClick={() => setSearchOpen(!searchOpen)}></i>
              <input type="text" name="search" placeholder="Enter the product you are looking for" />
            </form>
            <i onClick={() => setSearchOpen(!searchOpen)} className="icon-search"></i>
          </button>

          <button className="btn-cart" type='button' onClick={() => setShowCart(true) }>
            <span className="cart-item-qty">{totalQuantities}</span>
              <i className="icon-cart"></i>
          </button>

          {showCart && <Cart />}
        </div>

      </div>
    </header>
  )
};

export default Navbar