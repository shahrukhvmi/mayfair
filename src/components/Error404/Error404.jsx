import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { Link } from "react-router-dom";

const Error404 = () => {
  // Refs for GSAP animations
  const titleRef = useRef(null);
  const errorIconRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Error title animation (bounce in from top)
    gsap.fromTo(
      titleRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "bounce.out",
      }
    );

    // Error Icon animation (flip and shake)
    gsap.fromTo(
      errorIconRef.current,
      {
        scale: 0,
        rotationY: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotationY: 0,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Shake the error icon after the flip animation
          gsap.to(errorIconRef.current, {
            x: 10,
            yoyo: true,
            repeat: 5,
            duration: 0.1,
            ease: "ease.inOut",
          });
        },
      }
    );

    // Button animation (scale in with smooth fade)
    gsap.fromTo(
      buttonRef.current,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f2f1] to-[#cfe7f6] text-center px-4 relative overflow-hidden">
      {/* Error Icon */}
      <div
      
        className="bg-[#FF5C5C] text-white rounded-full p-6 shadow-lg mb-6 transform transition-transform duration-300 hover:scale-125 hover:rotate-12"
      >
        <MdOutlineReportGmailerrorred size={50} />
      </div>

      {/* Error Message */}
      <h1
        ref={titleRef}
        className="text-4xl md:text-5xl font-extrabold text-[#e63030] mb-4 tracking-wide"
      >
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-md mx-auto">
        The page you’re looking for could not be found.
      </p>

      {/* Animated Button */}
      <button
        ref={buttonRef}
        className="bg-[#4DB581] text-white px-6 py-3 rounded-md font-medium shadow-xl hover:bg-[#3A8F6F] transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <Link to="/dashboard/">Return to Home</Link>
      </button>
    </div>
  );
};

export default Error404;
