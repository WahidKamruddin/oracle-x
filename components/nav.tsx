import Link from "next/link";

const Nav = () => {
    return ( 
        <nav className="py-4">
            <div id="navbar" className="fixed w-full bg-off-white-100 ">
            <ul className="flex cursor-pointer">
                <li className="mx-4 text-black pb-1 border-transparent border-b-2  hover:border-black hover:duration-700 "><Link href="/">Home</Link></li>
                <li className="mx-4 text-black pb-1 border-transparent border-b-2  hover:border-black hover:duration-700 cursor-not-allowed "><Link href="" className='cursor-not-allowed'>FAQ</Link></li>
                <li className="mx-4 text-black pb-1 border-transparent border-b-2  hover:border-black hover:duration-700 "><Link href="/login">Login</Link> : <Link href="/dashboard">Dashboard</Link></li>
            </ul>
        </div>
        </nav>
    );
}
 
export default Nav;