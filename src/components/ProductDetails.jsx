import React, { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const [bids, setBids] = useState([]);
  const { user } = use(AuthContext);
  //   console.log(product);
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

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [_id]);

  const bidModalRef = useRef(null);
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    // console.log(_id, name, email, bid);
    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          // add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a,b)=>b.bid_price-a.bid_price)
          setBids(newBids);
        }
      });
  };
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
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="input"
                      readOnly
                      defaultValue={user?.displayName}
                    />
                    {/* {email} */}
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      readOnly
                      defaultValue={user?.email}
                    />
                    {/* {bid amount} */}
                    <label className="label">Bid</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Your Bid"
                      name="bid"
                    />
                    <button className="btn btn-neutral mt-4">
                      Place Your Bid
                    </button>
                  </fieldset>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Cancel</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      {/* {Bids Info} */}
      <div className="mt-10">
        <h3 className="text-3xl font-bold">
          Bids For This Product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL no.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bids Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
