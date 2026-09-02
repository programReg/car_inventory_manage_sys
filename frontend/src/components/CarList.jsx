import React from "react";
import FlipCard from "./FlipCard";
import "../styles.css";

const CarList = ({ cars, onSelectCar, selectedCars }) => {
  return (
    <div className="car-list">
      {cars.map((car) => (
        <FlipCard
          key={`${car.id}-${car.make}-${car.model}`}
          car={car}
          onSelectCar={onSelectCar}
          isSelected={selectedCars.some(
            (selectedCar) => selectedCar.id === car.id,
          )}
        />
      ))}
    </div>
  );
};

export default CarList;
