import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  useGetOrdersDataQuery,
  useGetViewOrderQuery,
} from "../../../store/services/Dashboard/dashboardApi";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "../../Pagination/Pagination";

const MyOrders = () => {
  const { data, isLoading } = useGetOrdersDataQuery();



  // const [orderData] = useState(data?.myorders.allorders);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("all");

  // Search handler
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  // Filter handler for status
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  // Filter data based on search input and status
  // const APIORDER = data?.myorders?.allorders
  const filteredData = data?.myorders?.allorders?.filter((order) => {
    const matchesSearch =
      order.order_id?.toString().includes(searchValue) ||
      order.treatment?.toLowerCase().includes(searchValue) ||
      // order.items.some((item) => item.name.toLowerCase().includes(searchValue));
      order.items.some((item) => item.product.toLowerCase().includes(searchValue));

    const matchesStatus =
      status === "all" || order.status.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });


  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "incomplete":
        return "bg-orange-100 text-orange-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="md:p-6 sm:px-2 sm:bg-[#F9FAFB] sm:min-h-screen sm:rounded-md sm:shadow-md my-5 md:me-5">
      {/* Search and Filter Section */}
      <header className="p-4">
        <h1 className="md:text-3xl text-lg mb-2 font-semibold">My Orders</h1>
        <p className="reg-font text-gray-600 text-left text-sm xl:w-3/4 mt-2">
          View your order history
        </p>
      </header>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 px-3">
        <div className="w-full md:w-1/2">
          <form
            className="flex items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                value={searchValue}
                onChange={handleSearchChange}
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2"
                placeholder="Search by Order ID, Treatment, or Dose"
              />
            </div>
          </form>
        </div>

        <div className="w-full md:w-auto flex items-center justify-between">
          <label
            htmlFor="status"
            className="text-sm reg-font text-gray-700 mr-2"
          >
            Sort by status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`text-sm rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 px-4 py-2 appearance-none pr-8 transition ease-in-out duration-200 ${getStatusClasses(
                status
              )}`}
            >
              <option value="all">All</option>
              <option value="processing">Processing</option>
              <option value="incomplete">Incomplete</option>
              <option value="approved">Approved</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="relative overflow-x-scroll lg:overflow-x-auto sm:w-full w-96 mt-6 overflow-hidden px-3">
        <table className="w-full text-sm text-left text-gray-500 table-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3">Treatment</th>
              <th className="px-4 py-3">Variation</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="border-b">
                <td className="px-4 py-3">
                  <Skeleton variant="text" width={100} height={20} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton variant="text" width={120} height={20} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton variant="text" width={150} height={20} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton variant="text" width={180} height={20} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton variant="text" width={80} height={20} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton variant="text" width={90} height={20} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton variant="rounded" width={20} height={20} />
                </td>
              </tr>
            ) : filteredData?.length > 0 ? (
              filteredData.map((order) => (
                <tr key={order?.id} className="border-b">
                  <td className="px-4 py-3">{order?.id}</td>
                  <td className="px-4 py-3">{order?.created_at}</td>
                  <td className="px-4 py-3">
                    {order?.items?.[0]?.product}
                  </td>

                  <td className="px-4 py-3">

                    {order?.items?.[0]?.name} x {order?.items?.[0]?.quantity}
                    {/* {order?.items.map((item, index) => (
                      <div key={index}>
                        Dose: {item.name} x {item.quantity}
                      </div>
                    ))} */}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${getStatusClasses(
                        order?.status
                      )} text-xs font-medium px-2.5 py-0.5 rounded-full`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">£{order?.total_price}</td>
                  <td className="px-4 py-3">
                    <Link to={`/orders/${order?.id}`}>
                      <IoEye size={20} color="#4565BF" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-base">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>



      </div>

      <Pagination pagination={data?.myorders} />

    </div>
  );
};

export default MyOrders;
