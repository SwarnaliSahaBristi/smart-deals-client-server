import React from 'react';
import Banner from '../components/Banner';
import LatestProducts from '../components/LatestProducts';

const latestProductPromise = fetch('http://localhost:3000/latest-products').then(res=>res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestProducts latestProductPromise={latestProductPromise}></LatestProducts>
        </div>
    );
};

export default Home;