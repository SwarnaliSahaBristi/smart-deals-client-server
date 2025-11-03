import React, { useRef } from "react";
import { Link, useLoaderData } from "react-router";

const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  const {
    image,
    description,
    title,
    category,
    condition,
    price_min,
    price_max,
    _id,
    created_at,
    seller_image,
    seller_name,
    location,
    seller_contact,
    status,
    email,
    usage,
  } = product;
  const bidModalRef = useRef(null);
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) =>{
        e.preventDefault();
  }
  return (
    <div className="bg-[#D9D9D9]">
      {/* {Product Info} */}
      <div className="flex p-8 justify-around">
        {/* {Left side} */}
        <div className="w-[400px]">
          <img className="h-[200px] w-[400px] rounded-3xl" src={image} alt="" />
          <div className="bg-white p-3 rounded-2xl mt-3">
            <h1 className="font-bold text-lg py-2">Product Description:</h1>
            <p>{description}</p>
          </div>
          <Link to="/allproducts" className="btn mt-3">
            Back to Products
          </Link>
        </div>
        {/* {middle Side} */}

        <div>
          <h1 className="font-bold text-2xl py-2">{title}</h1>
          <div className="flex gap-2">
            <p className="btn text-purple-600 rounded-2xl bg-purple-200 px-5">
              {category}
            </p>
            <p className="btn text-amber-600 rounded-2xl bg-amber-200 px-5">
              {condition}
            </p>
            <p className="btn text-amber-500 rounded-2xl bg-amber-50 px-5">
              {usage}
            </p>
          </div>
          {/* {bidding starts} */}
          <div className="bg-white p-3 mt-3 rounded-2xl">
            <p className="text-green-400 text-4xl">
              ${price_min}-{price_max}
            </p>
            <p className="font-semibold">Price Starts From</p>
          </div>
          {/* {Product details} */}
          <div className="bg-white p-3 mt-3 rounded-2xl">
            <h2 className="font-bold text-2xl">Product Details</h2>
            <p>Product Id: {_id}</p>
            <p>Posted At: {created_at}</p>
          </div>
        </div>
        {/* {Right side} */}
        <div className="bg-white p-3 rounded-2xl">
          <h2 className="font-bold text-2xl px-7">Seller Information</h2>
          <div className="flex gap-3 justify-center items-center">
            <img
              className="rounded-full w-20 h-20 bg-[#D9D9D9]"
              src={seller_image}
              alt=""
            />
            <div>
              <p className="font-semibold text-lg">{seller_name}</p>
              <p>{email}</p>
            </div>
          </div>
          <p className="font-semibold py-2">Location: {location}</p>
          <p className="font-semibold py-2">Contact No. {seller_contact}</p>
          <p className="font-semibold py-2">
            Status:{" "}
            <span className="btn text-amber-600 rounded-2xl bg-amber-200 px-5">
              {status}
            </span>
          </p>
          <div>
            <button
              onClick={handleBidModalOpen}
              className="w-full btn btn-primary mt-5 rounded-xl"
            >
              I want to buy this product.
            </button>
            <dialog
              ref={bidModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Give the best offer!!</h3>
                <p className="py-4">Offer something seller can resist...</p>
                <form onSubmit={handleBidSubmit}>
                  <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                    <div>
                      <a className="link link-hover">Forgot password?</a>
                    </div>
                    <button className="btn btn-neutral mt-4">Login</button>
                  </fieldset>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      {/* {Bids Info} */}
    </div>
  );
};

export default ProductDetails;
