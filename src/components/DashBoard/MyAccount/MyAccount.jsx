import React from "react";
import ProductCard from "../../ProductCard/ProductCard";
import { useGetProductsQuery } from "../../../store/services/Dashboard/dashboardApi";
import { Skeleton } from "@mui/material";

const SkeletonCard = () => (
  <div className="p-4 my-3 bg-white rounded-lg shadow-md">
    <Skeleton variant="rectangular" height={208} className="mb-4 rounded-lg" />

    <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="80%" />

    <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} width="60%" />

    <Skeleton variant="rectangular" height={40} className="mt-4 rounded-md" />

    
  </div>
);


const MyAccount = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  return (
    <div className="p-6 sm:bg-[#F9FAFB] sm:min-h-screen sm:rounded-md sm:shadow-md my-5">
      {/* ✅ Reorder Treatment Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : data?.data?.reorder && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Reorder Treatment</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.reorder ? (
              !Array.isArray(data.data.reorder) ? (
                <ProductCard
                  id={data?.data?.reorder?.id}
                  title={data?.data?.reorder?.name}
                  image={data?.data?.reorder?.img}
                  price={data?.data?.reorder?.price || "N/A"}
                  status={data?.data?.reorder?.status}
                  lastOrderDate={data?.data?.reorder?.lastOrderDate}
                  buttonText={"Reorder Consultation"}
                  reorder={true}
                />
              ) : (
                data?.data?.reorder.map((product, index) => (
                  <ProductCard
                    key={product?.id || index}
                    id={product?.id}
                    title={product?.name}
                    image={product?.img}
                    price={product?.price || "N/A"}
                    status={product?.status}
                    buttonText={"Reorder Consultation"}
                    reorder={true}
                  />
                ))
              )
            ) : (
              <p className="text-start reg-font text-sm text-gray-600">
                No reorder treatments available.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ✅ Available Treatments Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : data?.data?.products && (
        <>
          <h1 className="text-2xl font-bold mb-4">Available Treatments</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.products?.length > 0 ? (
              data?.data?.products?.map((product) => (
                <ProductCard
                  key={product?.id || product?.sequence}
                  id={product?.id}
                  title={product?.name}
                  image={product?.img}
                  price={product?.price || "N/A"}
                  status={product?.inventories?.[0]?.status}
                  buttonText={"Start Consultation"}
                  reorder={false}
                />
              ))
            ) : (
              <p className="text-start reg-font text-sm text-gray-600">
                No available treatments at the moment.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyAccount;
