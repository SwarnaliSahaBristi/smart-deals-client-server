import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { title, price_min, price_max,image,_id } = product;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="p-4">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl h-[250px] w-[450px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          Price:${price_min} - {price_max }
        </p>
        <div className="card-actions">
          <Link to={`/productDetails/${_id}`} className="btn btn-primary w-full">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
