import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user,logOut,setUser } = use(AuthContext);
  const handleLOgOut = () =>{
    logOut()
     .then(()=>{
        toast.success("Logout Successfully!!")
        setUser(null)
    })
    .catch(e=>{
        toast.error(e.message)
    })
  }
  const links = (
    <>
      <li>
        <NavLink className='navlink' to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className='navlink' to="/allproducts">All Products</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink className='navlink' to="/myProducts">MyProducts</NavLink>
          </li>
          <li>
            <NavLink className='navlink' to="/myBids">My Bids</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-bold italic">
          Smart<span className="gradient-text">Deals</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex gap-2 justify-between items-center">
            <img className="rounded-full h-15 w-15" src={user.photoURL} alt="" />
            <a onClick={handleLOgOut} className="btn btn-primary">Log Out</a>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to='/register' className="btn btn-primary">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
