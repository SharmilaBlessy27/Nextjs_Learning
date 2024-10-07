import Link from "next/link";
import React from "react";
import '../app/style.css'
const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-heading">
          <h4>Blog</h4>
        </div>
       <div>
       <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
       </div>
      </div>
    </>
  );
};

export default Header;
