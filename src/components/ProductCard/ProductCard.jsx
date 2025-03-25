import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import StartConsultationModal from "../StartConsultationModal/StartConsultationModal";
import ReOrderModel from "../ReOrderModel/ReOrderModel";
import { useGetPrevsMutation } from "../../store/services/Steps/Steps";
import { useDispatch } from "react-redux";
import { setStepPrevApiData } from "../../store/slice/stepSlice";
import { useNavigate } from "react-router-dom";
import { triggerStep } from "../../store/slice/stepper";
import { clearCart } from "../../store/slice/cartSlice";
import { clearCartAddon } from "../../store/slice/addonCartSlice";

const ProductCard = ({ id, title, image, price, status, buttonText, reorder, lastOrderDate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isReorderOpen, setReorderOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product_id");

    if (productId) {
      localStorage.setItem("pid", productId);
      setModalOpen(true);
    } else {
      // localStorage.removeItem("pid");
    }
  }, []);

  const handleMouseEnter = (event) => {
    const card = event.currentTarget;
    const img = card.querySelector(".product-image");

    gsap.to(card, { y: -10, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", duration: 0.3, ease: "power1.out" });
    gsap.to(img, { scale: 1.05, duration: 0.3, ease: "power1.out" });
  };

  const handleMouseLeave = (event) => {
    const card = event.currentTarget;
    const img = card.querySelector(".product-image");

    gsap.to(card, { y: 0, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", duration: 0.3, ease: "power1.inOut" });
    gsap.to(img, { scale: 1, duration: 0.3, ease: "power1.inOut" });
  };
  const navigate = useNavigate()

  const handleClick = () => {

    if (reorder) {
      localStorage.setItem("reorder", true);
      setReorderOpen(true);
      // localStorage.setItem("pid", id);
      // localStorage.setItem("comingFromStart", 0);
      // localStorage.setItem("start_concent", true);
      // localStorage.setItem("currentStep", 1);
      // dispatch(triggerStep(1));
      // dispatch(clearCart())
      // dispatch(clearCartAddon())
      // localStorage.removeItem("addonCart");
      // localStorage.removeItem("cart");
    } else {
      localStorage.setItem("reorder", false);
      setModalOpen(true);
      // localStorage.setItem("comingFromStart", 0);
      // localStorage.setItem("start_concent", true);
      // localStorage.setItem("currentStep", currentStep);
      // dispatch(triggerStep(currentStep));
      // localStorage.removeItem("addonCart");
      // localStorage.removeItem("cart");
      // dispatch(clearCart())
      // dispatch(clearCartAddon())
    }
  };
  // post pid or save preApiData 
  const [getPrev, { data, error, isLoading }] = useGetPrevsMutation();
  const clinic_id = 1;
  const url = import.meta.env.VITE_BASE_URL;

  const handleConfirm = async () => {
    const pid = parseInt(localStorage.getItem("pid"));
    const currentStep = Number(localStorage.getItem("currentStep")) || 1;
    const reorderStatus = JSON.parse(localStorage.getItem("reorder_concent"));

    // 👇👇 Check is re Ordr or New Order Logic here //👇👇

    if (reorder) {
      if (reorderStatus) {

        localStorage.setItem("pid", id);
        localStorage.setItem("comingFromStart", 0);
        localStorage.setItem("start_concent", true);
        localStorage.setItem("currentStep", 1);
        dispatch(triggerStep(1));
        localStorage.removeItem("addonCart");
        localStorage.removeItem("cart");
        dispatch(clearCart());
        dispatch(clearCartAddon());
        
      } else {

        // localStorage.setItem("reorder", false);
        localStorage.setItem("pid", id);
        localStorage.setItem("comingFromStart", 0);
        localStorage.setItem("start_concent", true);
        localStorage.setItem("currentStep", 2);
        dispatch(triggerStep(2));
        dispatch(clearCart());
        dispatch(clearCartAddon());
        localStorage.removeItem("addonCart");
        localStorage.removeItem("cart");
      }
    } else {

      if (!pid) {
        // Case 1: `pid` does not exist in localStorage
        localStorage.setItem("pid", id);
        localStorage.setItem("comingFromStart", 0);
        localStorage.setItem("start_concent", true);
        localStorage.setItem("currentStep", 1);

        dispatch(triggerStep(1)); // Trigger Step 1 in Redux
        dispatch(clearCart())
        dispatch(clearCartAddon())
        localStorage.removeItem("addonCart");
        localStorage.removeItem("cart");
      } else if (pid !== id) {
        // Case 2: `pid` exists but does not match the current `id`

        localStorage.setItem("pid", id);
        localStorage.setItem("comingFromStart", 0);
        localStorage.setItem("start_concent", true);
        localStorage.setItem("currentStep", 1);
        dispatch(triggerStep(1));
        localStorage.removeItem("addonCart");
        localStorage.removeItem("cart");
        dispatch(clearCart())
        dispatch(clearCartAddon())
      } else {
        // Case 3: `pid` matches the current `id`
        localStorage.setItem("comingFromStart", 0);
        localStorage.setItem("start_concent", true);
        localStorage.setItem("currentStep", currentStep);
        dispatch(triggerStep(currentStep));
        localStorage.removeItem("addonCart");
        localStorage.removeItem("cart");
        dispatch(clearCart())
        dispatch(clearCartAddon())
      }
    }



    try {
      const response = await getPrev({ url, clinic_id, product_id: id }).unwrap();


      const res = response?.data;
      if (res !== null) {
        dispatch(setStepPrevApiData(res));
        navigate("/consultation-form");

      }
    } catch (err) {
      console.error('Failed to fetch previous steps:', err);
    }
  };

  const handleClose = () => {
    setReorderOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="relative bg-white rounded-lg rounded-b-2xl overflow-hidden cursor-pointer transition-transform"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >


        {/* Out of Stock Overlay */}
        {!status && (
          <div className="h-full w-full left-0 absolute bg-[rgba(119,136,153,0.4)] cursor-not-allowed z-10 thin-font"></div>
        )}

        {/* Out of Stock Ribbon */}
        {!status && (
          <div className="absolute -left-8 top-7 bg-red-500 text-white px-[30px] text-xs py-1 rounded-tl -rotate-45 z-20 thin-font">
            Out of stock
          </div>
        )}

        {/* Price Ribbon */}
        {price && (
          <div className="absolute -right-8 top-7 bg-blue-500 text-white text-xs px-[30px] py-1 rounded-tr rotate-45 z-20 thin-font">
            From £{price}
          </div>
        )}

        {/* Product Image */}
        <div className="h-52 overflow-hidden bg-white">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
            onError={(e) => (e.target.src = "/images/default.png")}
          />
        </div>

        {/* Product Details */}
        <div className="bg-[#EDE9FE] p-5 text-center rounded-2xl">
          <h2 className="text-lg semibold-font mb-3 text-gray-900">{title}</h2>

          <p className="mb-3 text-sm  font-semibold">

            {lastOrderDate && `Last Ordered: ${lastOrderDate}`}
          </p>
          <button
            onClick={handleClick}
            className={`px-6 py-2 w-48 rounded-full text-white reg-font ${status ? "bg-[#7c3aed] hover:bg-[#fff]  hover:text-[#7c3aed] hover:scale-105" : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!status}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <StartConsultationModal loading={isLoading} text="Do you want to start the consultation?" closeModel={handleClose} onHandleConfirm={handleConfirm} />
      )}

      {isReorderOpen && <ReOrderModel loading={isLoading} text="Reorder" closeModel={handleClose} onHandleConfirm={handleConfirm} />}
    </>
  );
};

export default ProductCard;
