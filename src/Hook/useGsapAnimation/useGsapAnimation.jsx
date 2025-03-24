import { useEffect } from "react";
import { gsap } from "gsap";

const useGsapAnimation = (setIsLoaded, shouldAnimate) => {
  useEffect(() => {
    if (!shouldAnimate) {
      setIsLoaded(true); // Skip animation if it's not the specified route
      return;
    }

    const loaderLogo = document.querySelector(".loader-logo");
    const welcomeMessage = document.querySelector(".welcome-message");

    if (loaderLogo && welcomeMessage) {
      const timeline = gsap.timeline();

      // Animation steps
      timeline.fromTo(
        loaderLogo,
        { y: "100%", opacity: 0, position: "absolute" },
        { duration: 1, y: "0%", opacity: 1, ease: "power3.out" }
      );

      timeline.to(loaderLogo, {
        duration: 0.5,
        ease: "none",
      });

      timeline.to(loaderLogo, {
        duration: 0.5,
        y: "0%",
        ease: "power2.inOut",
      });

      timeline.to(loaderLogo, {
        duration: 0.5,
        css: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "60px",
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
        },
        ease: "power2.out",
      });

      timeline.to(".logo", {
        duration: 1,
        css: {
          width: 100,
        },
        ease: "power2.out",
      });

      timeline.to(welcomeMessage, {
        duration: 0.5,
        opacity: 1,
        ease: "power2.out",
      });

      setTimeout(() => {
        document.body.style.overflow = "auto";
        setIsLoaded(true);
      }, 4000);
    }
  }, [setIsLoaded, shouldAnimate]);
};

export default useGsapAnimation;
