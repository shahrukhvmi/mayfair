import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import { useGetViewOrderQuery } from "../../../store/services/Dashboard/dashboardApi";
import moment from "moment/moment";
import { Navbar } from "flowbite-react";
import Header from "../../Header";
const OrderDetails = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetViewOrderQuery({ id });

  const shippingData = data?.data?.order?.shipping;
  const patientData = data?.data?.order?.consultation?.fields?.patientInfo;
  const gpDetails = data?.data?.order?.consultation?.fields?.gpdetails;
  const date = data?.data?.order?.created_at;
  const time = data?.data?.order?.created_at_time;
  const products = data?.data?.order?.items;
  const shipmentFee = data?.data?.order?.shippment_weight;
  const total = data?.data?.order?.total_price;
  const order = data?.data?.order?.consultation?.fields?.checkout?.discount;

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  if (isLoading) {
    return (
      <div className="p-3 sm:bg-[#F9FAFB] sm:min-h-screen sm:rounded-md sm:shadow-md my-5 me-5 space-y-6">
        {/* Header Skeleton */}
        <Skeleton variant="text" width={200} height={40} />
        {/* Buttons Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <Skeleton variant="rounded" width={250} height={40} />
          <div className="flex flex-wrap space-x-2 space-y-2 md:space-y-0">
            <Skeleton variant="rounded" width={150} height={40} />
            <Skeleton variant="rounded" width={150} height={40} />
            <Skeleton variant="rounded" width={150} height={40} />
          </div>
        </div>
        {/* Section Title Skeleton */}
        <Skeleton variant="text" width={300} height={30} />
        {/* Tables Skeletons */}
        <div className="space-y-4">
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>
      </div>
    );
  }


  return (

    <>

      <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />


      <div className="p-3 sm:p-6 sm:bg-[#F9FAFB] sm:min-h-screen sm:rounded-md sm:shadow-md my-5 sm:me-5">
        <div className="relative">
          <p className="h-fit whitespace-nowrap inline-flex items-center px-6 py-2 bg-violet-700 border border-transparent rounded-tr-full rounded-br-full font-semibold text-xs cursor-text text-white uppercase tracking-widest hover:bg-violet-700 focus:bg-violet-700 active:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 transition ease-in-out duration-150  absolute -left-4 -top-4 lg:relative lg:top-0 lg:left-0">
            {date} {time}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center my-6">
          <h1 className="text-xl semibold-font text-[#1C1C29] my-4 sm:mb-4 md:mb-0">
            Details of Order #{data?.data?.order?.id}
          </h1>

          {/* Buttons for Order Details */}
          <div className="flex-wrap justify-between md:space-x-2 space-y-2 md:space-y-0 hidden sm:flex">
            <button className="px-5 py-3 bg-violet-700 text-white rounded-full hover:bg-[#3a4e91] transition duration-300 ease-in-out w-full md:w-auto">
              <span className="mx-1 my-1">Order Status</span>
              <span className="font-semibold bg-[#223e8a] text-xs rounded-lg p-1">
                {data?.data?.order?.status}
              </span>
            </button>

            <button className="px-5 py-3 bg-violet-700 text-white rounded-full hover:bg-[#3a4e91] transition duration-300 ease-in-out w-full md:w-auto">
              <span className="mx-1 my-1">Payment Status</span>
              <span className="font-semibold bg-[#223e8a] text-xs p-1 rounded-lg">
                {data?.data?.order?.payments?.status}
              </span>
            </button>

            <button className="px-5 py-3 bg-violet-700 text-white rounded-full hover:bg-[#3a4e91] transition duration-300 ease-in-out w-full md:w-auto">
              <span className="mx-1 my-1">Order Total</span>
              <span className="font-semibold bg-[#223e8a] text-xs p-1 rounded-lg">
                £{data?.data?.order?.total_price}
              </span>
            </button>
          </div>
          <div className="overflow-x-auto block sm:hidden w-full p-1">
            <h2 className="text-xl semibold-font text-[#1C1C29] mb-4">
              Order  Status
            </h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="px-3 py-4 text-gray-700">Order Status</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1  text-sm rounded-lg font-bold">
                      {data?.data?.order?.status}
                    </span>
                  </td>
                </tr>

                <tr className="border-b border-gray-300">
                  <td className="px-3 py-4 text-gray-700">Payment Status</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-sm rounded-lg font-bold">
                      {data?.data?.order?.payments?.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="px-3 py-4 text-gray-700">Order Total</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-sm rounded-lg font-bold">
                      £{data?.data?.order?.total_price}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Patient Information */}
        <div className="sm:bg-gray-50 p-2 sm:p-6 rounded-lg mb-6">
          <h2 className="text-xl semibold-font text-[#1C1C29] mb-4">
            Patient Information
          </h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] uppercase"
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] capitalize"
                  >
                    {patientData?.firstName ? patientData?.firstName : "N/A"}
                    {/* {shippingData.addresstwo ? shippingData?.addresstwo : "N/A"} */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    Last name
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {patientData?.lastName ? patientData?.lastName : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    Ethnicity
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {patientData?.ethnicity ? patientData?.ethnicity : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    Pregnancy
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {patientData?.pregnancy ? patientData?.pregnancy : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    gender
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {patientData?.gender ? patientData?.gender : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    dob
                  </TableCell>

                  <TableCell className="reg-font text-[#1C1C29] capitalize">
                    {patientData?.dob ? moment(patientData.dob).format('DD-MM-YYYY') : "N/A"}
                  </TableCell>


                </TableRow>

                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    Phone
                  </TableCell>

                  <TableCell className="reg-font text-[#1C1C29] capitalize">
                    {patientData?.phoneNo ? patientData?.phoneNo : "N/A"}
                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>



        {/* Product Detail */}


        <div className="p-3 sm:p-6 rounded-lg mb-6 ">
          <h2 className="text-xl semibold-font text-[#1C1C29] mb-4">Product Details</h2>


          <TableContainer component={Paper} className="rounded-lg shadow">
            <Table>
              {/* Table Head */}
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell className="text-black font-semibold uppercase py-3">

                    <span className="font-bold ">Treatment</span></TableCell>
                  <TableCell className="text-black font-semibold uppercase py-3">
                    <span className="font-bold ">Qty</span>
                  </TableCell>
                  <TableCell className="text-black font-semibold uppercase py-3">
                    <span className="font-bold ">Price</span></TableCell>
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {products?.filter((product) => product.name.includes("mg")).map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="text-gray-800 capitalize py-3">{product.label}</TableCell>
                    <TableCell className="text-gray-800 py-3">{product.quantity}</TableCell>
                    <TableCell className="text-gray-800 py-3">£{parseFloat(product.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}

                <TableRow className="hover:bg-gray-50">
                  <TableCell className="text-gray-800 py-3">Shipping Fee</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-gray-800 py-3">£{shipmentFee}</TableCell>
                </TableRow>

                {/* Shipping Fee (Optional) */}
                {order?.discount > 0 && (
                  <>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="text-gray-800 py-3 font-medium">Discount Amount</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-gray-800 py-3">
                        {order?.type === "Fixed"
                          ? `-£${order?.discount_value}`
                          : `-${parseFloat(order?.discount_value).toFixed(1)}%`}
                      </TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="text-gray-800 py-3 font-medium">Coupon Code</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-gray-800 py-3">{order?.code || "N/A"}</TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="text-gray-800 py-3 font-medium">Discount Type</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-gray-800 py-3">
                        {`${order?.type === "Fixed" ? "Fixed" : "Percentage"}`}
                      </TableCell>
                    </TableRow>
                  </>
                )}




                {/* Total Row */}
                <TableRow className="font-bold ">
                  <TableCell className="py-3 font-serif">
                    <span className="font-bold ">Total</span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="py-3">

                    <span className="font-bold ">£{total}</span></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>



        {/* GP Details */}
        <div className="sm:bg-gray-50 p-3 sm:p-6 rounded-lg mb-6">
          <h2 className="text-xl semibold-font text-[#1C1C29] mb-4">GP Details</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] uppercase "
                  >
                    gp Consent
                  </TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] capitalize"
                  >
                    {gpDetails?.gpConsent || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] uppercase"
                  >
                    address
                  </TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] capitalize"
                  >
                    {gpDetails?.addressLine1 || "N/A"}
                    {/* {gpDetails.addresstwo ? gpDetails?.addresstwo : "N/A"} */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    city
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {gpDetails?.city || "N/A"}
                    {/* {gpDetails.addresstwo ? gpDetails?.addresstwo : "N/A"} */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    email
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {gpDetails?.email || "N/A"}
                    {/* {gpDetails.addresstwo ? gpDetails?.addresstwo : "N/A"} */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    state
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {gpDetails?.state || "N/A"}
                    {/* {gpDetails.addresstwo ? gpDetails?.addresstwo : "N/A"} */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="sm:bg-gray-50 p-3 sm:p-6 rounded-lg mb-6">
          <h2 className="text-xl semibold-font text-[#1C1C29] mb-4">
            Shipping Information
          </h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>

                <TableRow>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] uppercase"
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] capitalize"
                  >
                    {shippingData?.first_name ? shippingData?.first_name : patientData?.firstName ? patientData?.firstName : "N/A"}

                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] uppercase"
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] capitalize"
                  >
                    {shippingData?.last_name ? shippingData?.last_name : patientData?.lastName ? patientData?.lastName : "N/A"}

                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] uppercase"
                  >
                    Address1
                  </TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] capitalize"
                  >
                    {shippingData?.addressone ? shippingData?.addressone : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] uppercase"
                  >
                    Address2
                  </TableCell>
                  <TableCell
                    style={{ width: "50%" }}
                    className="reg-font  text-[#1C1C29] capitalize"
                  >
                    {shippingData?.addresstwo ? shippingData?.addresstwo : "N/A"}
                    {/* {shippingData.addresstwo ? shippingData?.addresstwo : "N/A"} */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    City
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {shippingData?.city ? shippingData?.city : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    State / Province / Region:
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {shippingData?.state ? shippingData?.state : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    Postalcode
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {shippingData?.postalcode ? shippingData?.postalcode : "N/A"}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    Country
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {shippingData?.country ? shippingData?.country : "N/A"}
                  </TableCell>
                </TableRow>


                <TableRow>
                  <TableCell className="reg-font  text-[#1C1C29] uppercase">
                    Phone Number
                  </TableCell>
                  <TableCell className="reg-font  text-[#1C1C29] capitalize">
                    {patientData?.phoneNo ? patientData?.phoneNo : "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <Link to="/orders/">
            <button className="px-6 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-700 transition">
              Back
            </button>
          </Link>
        </div>
      </div>

    </>
  );
};

export default OrderDetails;
