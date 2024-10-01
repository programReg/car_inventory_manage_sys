import React from "react";
import "../styles.css";

const CarList = ({ cars, onSelectCar, selectedCars }) => {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <div
          key={`${car.id}-${car.make}-${car.model}`}
          className={`car-item ${
            selectedCars.some((selectedCar) => selectedCar.id === car.id)
              ? "selected"
              : ""
          }`}
          onClick={() => onSelectCar(car)}
        >
          <h3>
            {car.make} {car.model}
          </h3>
          <p>Year: {car.year}</p>
          <p>Price: ${car.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CarList;
