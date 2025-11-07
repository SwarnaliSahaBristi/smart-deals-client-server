import React from "react";
import Banner from "../components/Banner";
import LatestProducts from "../components/LatestProducts";

const latestProductPromise = fetch(
  "https://smart-deals-server-beta.vercel.app/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestProducts
        latestProductPromise={latestProductPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
