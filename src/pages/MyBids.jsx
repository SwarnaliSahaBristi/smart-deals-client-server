import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBIds] = useState([]);
  const axiosSecure = useAxiosSecure();

  //console.log("token", user.accessToken);

  //axios secure
  useEffect(() => {
    axiosSecure.get(`bids?email=${user.email}`).then((data) => {
      setBIds(data.data);
    });
  }, [user, axiosSecure]);

  //JWT token
  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://smart-deals-server-beta.vercel.app/bids?email=${user.email}`,{
  //       headers: {
  //         authorization : `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         //console.log(data);
  //         setBIds(data);
  //       });
  //   }
  // }, [user]);

  //firebase token
  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://smart-deals-server-beta.vercel.app/bids?email=${user.email}`,{
  //       headers: {
  //         authorization : `Bearer ${user.accessToken}`
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         //console.log(data);
  //         setBIds(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-server-beta.vercel.app/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });

              //const remaining bids
              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBIds(remainingBids);
            }
          });
      }
    });
  };
  return (
    <div className="mt-10">
      <h3 className="text-3xl font-bold">
        My Bids:
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
              <th>Status</th>
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
                <td>
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-xs"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
