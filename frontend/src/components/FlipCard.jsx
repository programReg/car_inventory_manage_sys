import React, { useState } from "react";
import "../styles.css";

const FlipCard = ({ car, onSelectCar, isSelected }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    onSelectCar(car);
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h3>
            {car.year} {car.make} {car.model}
          </h3>
        </div>
        <div className="flip-card-back">
          <h3>
            {car.year} {car.make} {car.model}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
