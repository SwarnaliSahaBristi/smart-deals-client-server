import React from "react";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
// import useAxios from "../hook/useAxios";

const CreateAProduct = () => {
  const { user } = useAuth();
//   const axiosInstance = useAxios();
    const instance = useAxiosSecure();

  const handleCreateAProduct = (e) => {
    e.preventDefault();
    const title = e.target.name.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    console.log(title, image, price_min, price_max);
    const newProduct = { title, image, price_min, price_max,
        email: user.email,
        seller_name: user.displayName
    };

    // axios.post("http://localhost:3000/products", newProduct).then((data) => {
    //   console.log(data.data);
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Your product has been created",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });

    // axiosInstance.post('/products',newProduct)
    // .then(data=>{
    //     console.log(data.data)
    // })

    instance.post('/products',newProduct)
    .then(data=>{
        console.log('after secure call',data.data)
    })

  };
  return (
    <div className="lg:w-1/2 mx-auto">
      <form onSubmit={handleCreateAProduct}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="name" className="input" />
          {/* {Image} */}
          <label className="label">Photo URL</label>
          <input type="text" name="image" className="input" />
          {/* {bid amount} */}
          <label className="label">Min Bid</label>
          <input
            type="text"
            className="input"
            placeholder="Minimum Price"
            name="price_min"
          />
          {/* {bid amount} */}
          <label className="label">Max Bid</label>
          <input
            type="text"
            className="input"
            placeholder="Maximum Price"
            name="price_max"
          />
          <button className="btn btn-neutral mt-4">Create A Product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateAProduct;
