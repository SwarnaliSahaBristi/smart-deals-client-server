import React, { use } from "react";
import ProductCard from "./ProductCard";

const LatestProducts = ({ latestProductPromise }) => {
  const products = use(latestProductPromise);
//   console.log(products);
  return (
    <div>
        <h2 className="text-2xl font-bold text-center p-9">Recent <span className="gradient-text">Products</span></h2>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
