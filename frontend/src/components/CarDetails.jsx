import React from "react";
import "../styles.css";

const CarDetail = ({ car }) => {
  return (
    <div className="car-detail">
      <h2>
        {car.year} {car.make} {car.model}
      </h2>
      <p>Price: ${Number(car.price).toLocaleString()}</p>
      <p>Mileage: {Number(car.mileage).toLocaleString()} miles</p>
      <p>Transmission: {car.transmission}</p>
      <p>Drivetrain: {car.drivetrain}</p>
      <p>Fuel type: {car.fuel}</p>
    </div>
  );
};

export default CarDetail;
