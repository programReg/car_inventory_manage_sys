import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config";
import "./styles.css";
import CarList from "./components/CarList";
import Comparison from "./components/Comparison";

const App = () => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    fetchCars(1, true);
  }, [searchTerm, priceRange, selectedBrand]);

  useEffect(() => {
    if (page > 1) fetchCars(page, false);
  }, [page]);

  const fetchCars = async (pageNum, replace) => {
    try {
      setLoading(true);
      const params = { page: pageNum };
      if (searchTerm) params.search = searchTerm;
      if (selectedBrand) params.make = selectedBrand;
      if (priceRange.min) params.min_price = priceRange.min;
      if (priceRange.max) params.max_price = priceRange.max;

      const response = await axios.get(`${API_URL}/cars/`, { params });
      const newCars = response.data.results;

      setCars((prev) => (replace ? newCars : [...prev, ...newCars]));
      setHasMore(response.data.next !== null);

      if (replace) {
        const autoBrands = [...new Set(newCars.map((car) => car.make))];
        setBrands((prev) => [...new Set([...prev, ...autoBrands])]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching car data:", err);
      setError("Failed to fetch car data. Please try again later.");
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSelectCar = (car) => {
    setSelectedCars((prevSelected) => {
      const isAlreadySelected = prevSelected.find((c) => c.id === car.id);
      if (isAlreadySelected) {
        return prevSelected.filter((c) => c.id !== car.id);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, car];
      } else {
        alert("You can only compare up to 3 cars at a time!");
        return prevSelected;
      }
    });
  };

  const clearComparison = () => {
    setSelectedCars([]);
  };

  if (loading && cars.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Reggie's Vehicle Inventory</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="price-range">
          <input
            type="number"
            placeholder="Minimum Price"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
            className="price-input"
          />
          <input
            type="number"
            placeholder="Maximum Price"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
            className="price-input"
          />
        </div>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="brand-select"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <CarList
        cars={cars}
        onSelectCar={handleSelectCar}
        selectedCars={selectedCars}
      />

      {hasMore && !loading && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
      {loading && cars.length > 0 && <div>Loading more...</div>}

      {selectedCars.length > 0 && (
        <div className="comparison-section">
          <h2>
            {selectedCars.length === 1 ? "Car Details" : "Car Comparison"}
          </h2>
          <button onClick={clearComparison} className="clear-all-btn">
            Clear All
          </button>
          <Comparison cars={selectedCars} />
        </div>
      )}
    </div>
  );
};

export default App;
