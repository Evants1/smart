// src/components/ScrollUpButton.js
import React, { useState, useEffect } from "react";

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "rgb(13 202 240)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: "1000",
        }}
      >
        ↑
      </button>
    )
  );
};

export default ScrollUpButton;
