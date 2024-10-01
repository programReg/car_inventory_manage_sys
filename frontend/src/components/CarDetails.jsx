import React from "react";
import "../styles.css";

const CarDetail = ({ car }) => {
  return (
    <div className="car-detail">
      <h2>{car.name}</h2>
      <p> Price: ${car.price}</p>
      <p> Year: ${car.year}</p>
      <p> Mileage: ${car.mileage} km</p>
      <p> Transmission: ${car.transmission}</p>
      <p> Horsepower: ${car.horsepower} HP</p>
      <p> Fuel type: ${car.fuel}</p>
    </div>
  );
};

export default CarDetail;
