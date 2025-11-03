import React, { use } from 'react';

const LatestProducts = ({latestProductPromise}) => {
    const products = use(latestProductPromise);
    console.log(products);
    return (
        <div>
            
        </div>
    );
};

export default LatestProducts;