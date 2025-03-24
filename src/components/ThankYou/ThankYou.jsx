import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const ThankYou = () => {
    // Refs for GSAP animations
    const checkmarkRef = useRef(null);
    const titleRef = useRef(null);
    const buttonRef = useRef(null);
    const backgroundRef = useRef(null);

    // useEffect(() => {
    //     // Checkmark animation (popping in with rotation)
    //     gsap.fromTo(
    //         checkmarkRef.current,
    //         {
    //             scale: 0,
    //             rotation: 180,
    //         },
    //         {
    //             scale: 1,
    //             rotation: 0,
    //             duration: 1.5,
    //             ease: "back.out(1.7)",
    //         }
    //     );

    //     // Title text animation (sliding in)
    //     gsap.fromTo(
    //         titleRef.current,
    //         {
    //             y: -100,
    //             opacity: 0,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             duration: 1,
    //             ease: "power3.out",
    //         }
    //     );

    //     // Button animation (bouncing in)
    //     gsap.fromTo(
    //         buttonRef.current,
    //         {
    //             scale: 0.8,
    //             opacity: 0,
    //         },
    //         {
    //             scale: 1,
    //             opacity: 1,
    //             duration: 1,
    //             delay: 1.5,
    //             ease: "bounce.out",
    //         }
    //     );


    //     // Background Parallax effect (moving slower than content)
    //     gsap.to(backgroundRef.current, {
    //         backgroundPosition: "center center",
    //         scrollTrigger: {
    //             trigger: backgroundRef.current,
    //             start: "top bottom",
    //             end: "bottom top",
    //             scrub: true,
    //         },
    //     });
    // }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0f2f1] to-[#cfe7f6] text-center px-4 relative overflow-hidden">
            {/* Parallax Background */}
            <div
                // ref={backgroundRef}
                className="absolute inset-0 bg-gradient-to-r from-[#4DB581] to-[#3A8F6F] z-[-1]"
                style={{ backgroundSize: "200% 200%" }}
            ></div>

            {/* Animated Checkmark Icon */}
            <div
                ref={checkmarkRef}
                className="bg-[#4DB581] text-white rounded-full p-6 shadow-lg mb-6"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            {/* Thank You Text */}
            <h1
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold text-[#4565BF] mb-4"
            >
                Thank You!
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-8">
                Your order has been received.
            </p>

            {/* Animated Button */}
            <button
                ref={buttonRef}
                className="bg-[#4DB581] text-white px-6 py-3 rounded-md font-medium shadow-md hover:bg-[#3A8F6F] transform transition-transform duration-300 hover:scale-105"
            >
                <a href="/">
                    Return to Home
                </a>
            </button>

            {/* Additional Info */}
            {/* <p className="text-gray-600 mt-10 text-sm max-w-md">
                Your information is kept private and will be reviewed by a healthcare professional. The questions are meant to help the prescriber make an informed decision about the suitability of the treatment.
            </p> */}

            {/* Medical SVG with 3D Animation */}

        </div>
    );
};

export default ThankYou;
