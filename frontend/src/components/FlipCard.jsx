import React, { useState } from "react";
import CarDetail from "./CarDetails";
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
            {car.make} {car.model}
          </h3>
          <p>Year: {car.year}</p>
          <p>Price: ${car.price}</p>
        </div>
        <div className="flip-card-back">
          <CarDetail car={car} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
