'use client'

import Link from "next/link";
import { useAuth } from "./providers/authProvider";

const Nav = () => {
  
  const isAuthenticated = useAuth().isAuthenticated;
  console.log(isAuthenticated);

  return (
    <nav className="w-full">
      <ul
        id="navbar"
        className="my-4 fixed w-full bg-off-white-100 flex justify-end items-center"
      >
        <li className="mx-4 text-black pb-1 border-transparent border-b-2  hover:border-black hover:duration-700 ">
          <Link href="/">Home</Link>
        </li>
        <li className="mx-4 text-black pb-1 border-transparent border-b-2  hover:border-black hover:duration-700 cursor-not-allowed ">
          <Link href="" className="cursor-not-allowed">
            Search
          </Link>
        </li>
        <li className="mx-4 text-black pb-1 border-transparent border-b-2  hover:border-black hover:duration-700 ">
          <Link href="" className="cursor-not-allowed">
            Tokens
          </Link>
        </li>
        <li className="ml-4 mr-8 text-black pb-1 border-transparent border-b-2  hover:border-black hover:duration-700 ">
          {isAuthenticated ? 
            <Link href="/profile">Account</Link>
           : 
            <Link href="/login">Login</Link>
          }
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
