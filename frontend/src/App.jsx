import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import CarList from "./components/CarList";
import Comparison from "./components/Comparison";

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCars();
  }, [page]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/cars/?page=${page}`
      );
      const newCars = response.data.results;

      if (page === 1) {
        // Replace the entire list if it's the first page
        setCars(newCars);
        setFilteredCars(newCars);
      } else {
        // Append to the existing list for subsequent pages
        setCars((prevCars) => [...prevCars, ...newCars]);
        setFilteredCars((prevCars) => [...prevCars, ...newCars]);
      }

      const autoBrands = [
        ...new Set([...cars, ...newCars].map((car) => car.make)),
      ];
      setBrands(autoBrands);
      setHasMore(response.data.next !== null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching car data:", error);
      setError("Failed to fetch car data. Please try again later.");
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterCars(term, priceRange, selectedBrand);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
    filterCars(searchTerm, { min, max }, selectedBrand);
  };

  const handleBrandSelect = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    filterCars(searchTerm, priceRange, brand);
  };

  const filterCars = (term, price, brand) => {
    const filtered = cars.filter(
      (car) =>
        car.make.toLowerCase().includes(term) &&
        car.price >= price.min &&
        car.price <= price.max &&
        (brand === "" || car.make.toLowerCase().includes(brand.toLowerCase()))
    );
    setFilteredCars(filtered);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1> German Car Inventory Management System</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="price-range">
          <input
            type="number"
            placeholder="Minimum Price"
            onChange={(e) =>
              handlePriceRangeChange(Number(e.target.value), priceRange.max)
            }
            className="price-input"
          />
          <input
            type="number"
            placeholder="Maximum Price"
            onChange={(e) =>
              handlePriceRangeChange(
                priceRange.min,
                Number(e.target.value) || Infinity
              )
            }
            className="price-input"
          />
        </div>

        <select onChange={handleBrandSelect} className="brand-select">
          <option value=""> All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <CarList
        cars={filteredCars}
        onSelectCar={handleSelectCar}
        selectedCars={selectedCars}
      />
      {hasMore && !loading && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {selectedCars.length > 0 && (
        <div className="comparison-section">
          <h2>Car Comparison</h2>
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
