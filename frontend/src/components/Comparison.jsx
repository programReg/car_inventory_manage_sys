import React from "react";
import "../styles.css";

const Comparison = ({ cars }) => {
  return (
    <div className="comparison">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {cars.map((car) => (
              <th key={car.id}>
                {car.make} {car.model}
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
            "horsepower",
            "fuel",
          ].map((feature) => (
            <tr key={feature}>
              <td>{feature.charAt(0).toUpperCase() + feature.slice(1)}</td>
              {cars.map((car) => (
                <td key={car.id}> {car[feature]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comparison;
