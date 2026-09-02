import React from "react";
import "../styles.css";

const Comparison = ({ cars }) => {
  const formatValue = (feature, value) => {
    if (feature === "price") return `$${Number(value).toLocaleString()}`;
    if (feature === "mileage") return `${Number(value).toLocaleString()} miles`;
    return value;
  };

  return (
    <div className="comparison">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {cars.map((car) => (
              <th key={car.id}>
                {car.year} {car.make} {car.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            "price",
            "year",
            "mileage",
            "transmission",
            "drivetrain",
            "fuel",
          ].map((feature) => (
            <tr key={feature}>
              <td>{feature.charAt(0).toUpperCase() + feature.slice(1)}</td>
              {cars.map((car) => (
                <td key={car.id}>{formatValue(feature, car[feature])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comparison;
