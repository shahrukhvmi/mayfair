import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../Modal/ConfirmationModal";
import moment from "moment/moment";

const Dose = ({
  id,
  doseData,
  allowed,
  onIncrement,
  onDecrement,
  totalSelectedQty,
  isSelected,
  onSelect,
  productName,
  onClick,
  handleRemoveItem,
  removeSeleted,
  setRemoveSelected,
  setVariations,
  handleSelect,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleDeleteClick = (dose) => {
    setItemToRemove(dose);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    if (!itemToRemove) return;
  
    const removeitem = removeSeleted.filter((item) => item.id === itemToRemove.id);
  
    if (removeitem.length > 0) {
      handleSelect(removeitem[0].e, removeitem[0].id);
      setRemoveSelected(removeSeleted.filter((item) => item.id !== itemToRemove.id));
    } else {
      setVariations((prev) =>
        prev.map((variation) =>
          variation.id === itemToRemove.id ? { ...variation, isSelected: false } : variation
        )
      );
    }
  
    handleRemoveItem(itemToRemove.id, itemToRemove.id);
    setShowModal(false); // Close the modal
  };
  


  const handleCancelRemove = () => {
    setShowModal(false);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    const totalQty = totalSelectedQty + 1;

    if (totalQty > allowed) {
      toast.error(`You can only select up to ${allowed} units in total.`);
    } else if (doseData.qty >= doseData.stock.quantity) {
      toast.error(`Only ${doseData.stock.quantity} units are available.`);
    } else {
      onIncrement(id);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();

    if (doseData.qty > 1) {
      onDecrement(id);
    }
  };

  const handleSelected = (e) => {
    e.stopPropagation();
    onSelect(e);
  };

  return (
    <>
      <div
        onClick={(e) => {
          onClick(e);
          handleSelected(e);
        }}
        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer mb-3 transition-all duration-300 ease-in-out ${isSelected || doseData.isSelected
          ? "border-blue-500 bg-blue-100 hover:bg-blue-200"
          : "border-gray-300 bg-white hover:bg-gray-50"
          }`}
      >
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelected}
            className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full bg-white checked:border-blue-500 checked:bg-blue-500 transition-all duration-300 cursor-pointer"
          />
          <span
            className={`font-med text-sm sm:text-md lowercase ${isSelected || doseData.isSelected ? "text-blue-600" : "text-gray-800"
              } text-lg`}
          >
            <span className="font-med text-sm sm:text-md capitalize">
              {productName}
            </span>{" "}
            <br />
            <span className="font-bold text-sm sm:text-md lowercase ">
              {doseData.name}
            </span>
            <br />


            <h5 className="font-sm md:text-[12px] mt-3 text-red-600 capitalize">

              {doseData?.expiry
                ? `Expiry: ${moment(doseData?.expiry).format("DD/MM/YYYY")}`
                : ""}
            </h5>

          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span
            className={`font-med text-sm sm:text-md ${isSelected || doseData.isSelected ? "text-blue-600" : "text-gray-700"
              } font-bold text-sm sm:text-md`}
          >
            £{parseFloat(doseData.price).toFixed(2)}
          </span>

          {isSelected && (
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleDecrement}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-2 py-2 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <FaMinus size={10} />
              </button>
              <span className="px-2 py-1 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg shadow-sm">
                {doseData.qty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className={`bg-gray-200 text-gray-700 hover:bg-gray-300 px-2 py-2 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${totalSelectedQty >= allowed ? "cursor-not-allowed opacity-60" : ""
                  }`}
                disabled={totalSelectedQty >= allowed}
              >
                <FaPlus size={10} />
              </button>

            </div>
          )}
        </div>

        {isSelected && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(doseData);
            }}
            className="bg-red-100 hover:bg-red-200 text-red-500 rounded-md p-2 ml-3"
          >
            <MdDelete />
          </button>
        )}
      </div>



      <ConfirmationModal
        showModal={showModal}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </>
  );
};

export default Dose;
