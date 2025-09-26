"use client";
import {React, useEffect} from "react";

const LinearProgressBar = ({ 
  percentage, 
  width = "100%", 
  height = "0.5rem", // Height in rem units
  percentagePosition = "hover" // hover, top, left, right, bottom, or combinations like "top,left", "top,right", "bottom,left", "bottom,right"
}) => {
  useEffect(() => {
    if (percentagePosition === "hover") {
      let floatingLabel = document.querySelector(
        `[data-perc='${percentage}'] .floating-label`
      );

      if (floatingLabel) {
        floatingLabel.style.setProperty("--left-percentage", percentage);
        floatingLabel.style.animationName = "none";
        floatingLabel.style.left = percentage;
        floatingLabel.style.animationName = "animateFloatingLabel";
      }
    }
  }, [percentage, percentagePosition]);

  // Parse position combinations
  const positions = percentagePosition.split(',').map(pos => pos.trim());
  const isHover = percentagePosition === "hover";
  const hasTop = positions.includes("top");
  const hasBottom = positions.includes("bottom");
  const hasLeft = positions.includes("left");
  const hasRight = positions.includes("right");

  // Helper function to get percentage label
  const renderPercentageLabel = () => (
    <span className="text-xs fw-semibold text-secondary-light bg-base border radius-8 w-50-px h-32-px d-flex justify-content-center align-items-center">
      {percentage}
    </span>
  );

  // Helper function to get container classes based on position
  const getContainerClasses = () => {
    const baseClasses = "progress-wrapper d-flex gap-4";
    
    if (isHover) {
      return `${baseClasses} flex-column align-items-center`;
    }

    // Handle combined positions
    if (hasTop && hasLeft) {
      return `${baseClasses} flex-column align-items-start`;
    }
    if (hasTop && hasRight) {
      return `${baseClasses} flex-column align-items-end`;
    }
    if (hasBottom && hasLeft) {
      return `${baseClasses} flex-column-reverse align-items-start`;
    }
    if (hasBottom && hasRight) {
      return `${baseClasses} flex-column-reverse align-items-end`;
    }

    // Handle single positions
    if (hasTop) {
      return `${baseClasses} flex-column align-items-center`;
    }
    if (hasBottom) {
      return `${baseClasses} flex-column-reverse align-items-center`;
    }
    if (hasLeft) {
      return `${baseClasses} flex-row align-items-center`;
    }
    if (hasRight) {
      return `${baseClasses} flex-row-reverse align-items-center`;
    }

    return `${baseClasses} flex-column align-items-center`;
  };

  // Helper function to get progress bar container width
  const getProgressBarWidth = () => {
    if (isHover || hasTop || hasBottom) {
      return "100%";
    }
    if (hasLeft || hasRight) {
      return "calc(100% - 60px)";
    }
    return "100%";
  };

  return (
    <div
      className={getContainerClasses()}
      data-perc={percentage}
      style={{ width }}
    >
      {/* Render percentage label for non-hover positions */}
      {!isHover && renderPercentageLabel()}
      
      <div 
        className={`position-relative d-flex ${isHover ? "h-50-px" : ""}`} 
        style={{ width: getProgressBarWidth() }}
      >
        {/* Floating label for hover position */}
        {isHover && (
          <span className="floating-label position-absolute text-xs fw-semibold text-secondary-light bg-base border radius-8 w-50-px h-32-px z-1 d-flex justify-content-center align-items-center">
            {percentage}
          </span>
        )}
        
        <div
          className="progress mt-auto w-100 bg-primary-50"
          role="progressbar"
          aria-label="Progress bar"
          aria-valuenow={parseInt(percentage, 10)}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ height }}
        >
          <div
            className="progress-bar animated-bar rounded-pill bg-primary-gradien overflow-visible"
            style={{ width: percentage }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LinearProgressBar;
