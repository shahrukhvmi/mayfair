import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../Modal/ConfirmationModal";
import moment from "moment/moment";
import { HiOutlineTrash } from "react-icons/hi";

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
      <div className="flex flex-col items-center">
        {/* Main Card */}
        <div
          onClick={(e) => {
            onClick(e);
            handleSelected(e);
          }}
          
          className={`w-48 overflow-hidden variations pt-8 pb-3 px-2 relative bg-white text-center cursor-pointer rounded-tl-md rounded-tr-md duration-300 border-2
          ${isSelected ? "border-violet-700" : "border-gray-300 hover:border-violet-700"}`}
        >
          {/* Radio Button in Top Left */}
          <div className="absolute top-3 left-3">
            <input
              type="radio"
              checked={isSelected}
              onChange={handleSelected}
              className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:border-violet-700 checked:bg-violet-700 transition-all duration-300 cursor-pointer"
            />
          </div>
          <div className="absolute top-3 left-3">
            <div
              onClick={handleSelected}
              className={`w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300
      ${isSelected ? "border-violet-700 bg-violet-700" : "bg-white"}`}
            >
              {isSelected && (
                <FaCheck size={10} color="white" />
              )}
            </div>
          </div>

          {/* Product Name & Dosage */}
          <div className="w-full flex flex-col gap-2 mt-4">
            <div className="text-white bg-violet-700 font-reg text-center py-2 rounded-md text-xs">
              {productName}
            </div>
            <div className="text-white bg-violet-700 font-reg text-center py-2 rounded-md text-xs">
              {doseData.name}
            </div>
          </div>

          {/* Price */}
          <span className="font-bold text-md mt-2 block ">
            £{parseFloat(doseData.price).toFixed(2)}
          </span>

          {/* Quantity Adjuster */}

        </div>
        {isSelected && (
          <div className=" w-48 flex items-center justify-evenly bg-violet-700 py-2  rounded-bl-lg rounded-br-lg">
            <button
              type="button"
              onClick={handleDecrement}
              className=" text-white px-2 py-1 rounded-md transition-all duration-300"
            >
              <FaMinus size={12} />
            </button>
            <span className="mx-2 px-3 py-1 bg-white text-gray-900 text-sm font-semibold rounded-md">
              {doseData.qty}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className={` text-white  px-2 py-1 rounded-md transition-all duration-300 ${totalSelectedQty >= allowed ? "cursor-not-allowed opacity-60" : ""
                }`}
              disabled={totalSelectedQty >= allowed}
            >
              <FaPlus size={12} />
            </button>
          </div>
        )}
        {/* Remove Button (Only When Selected) */}
        {/* {isSelected && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(doseData);
              }}
              className="bg-red-100 hover:bg-red-200 text-red-500 rounded-md px-3 py-1 mt-2 flex items-center"
            >
              <span
              // onClick={(e) => handleStopModal(e, isVisible)} // Ensure modal closes

              >
                <HiOutlineTrash />{" "}
                <span className="font-semibold text-sm px-1">
                  Remove
                </span>
              </span>
            </button>
          </div>
        )} */}


        <div className="flex justify-center">
          {isSelected && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(doseData);
              }}
              className="mt-2 px-2 py-2"
            >
              <span
                className="inline-flex items-center justify-center px-2 py-0.5 ms-2 text-md text-red-600 cursor-pointer  shadow-sm bg-red-100 hover:bg-red-200 rounded dark:bg-gray-700 dark:text-gray-400"
              >
                <HiOutlineTrash />{" "}
                <span className="font-semibold text-sm px-1">
                  Remove
                </span>
              </span>
            </button>
          )}
        </div> </div>

      <ConfirmationModal
        showModal={showModal}
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />
    </>
  );
};

export default Dose;
