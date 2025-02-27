import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    size: [],
    color: "",
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Navy",
    "Pink",
    "Beige",
  ];
  const sizes = ["XS", "S", "M", "L", "XXL"];
  const genders = ["Men", "Women"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen"];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const useEffect =
    (() => {
      const params = Object.fromEntries([[...searchParams]]);

      setFilters = {
        category: params.category || "",
        gender: params.gender || "",
        color: params.color || "",
        size: params.size ? params.size.split(",") : [],
        materials: params.materials ? params.materials.split(",") : [],
        brands: params.brands ? params.brands.split(",") : [],
        minPrice: params.minPrice || 0,
        maxPrice: params.maxPrice || 100,
      };
      setPriceRange([0, params.maxPrice || 100]);
    },
    [searchParams]);
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    console.log({ name, value, checked, type });
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4"> Filter</h3>

      <div className="mb-6">
        {/* Category Filter */}
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
      <div className="mb-6">
        {/* Gender Filter */}
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>
      <div className="mb-6">
        {/* Color Filter */}
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              value={color}
              onChange={handleFilterChange}
              name="color"
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105"
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        {/* Size Filter */}
        <label lassName="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500ue-500 focus:ring-blue-400 border-gray-500"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      <div className="mb-6">
        {/* Material Filter */}
        <label lassName="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500ue-500 focus:ring-blue-400 border-gray-500"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>
      <div className="mb-6">
        {/* Brands Filter */}
        <label lassName="block text-gray-600 font-medium mb-2">Brands</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500ue-500 focus:ring-blue-400 border-gray-500"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>
      <div className="mb-8">
        {/* Price Range Filter */}
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          v value={priceRange} 
              onChange={handleFilterChange}
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-500 mt-2"></div>
      </div>
    </div>
  );
};

export default FilterSidebar;
