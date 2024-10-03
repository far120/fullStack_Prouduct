import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './aside.css';

export default function Aside() {
  const [isChecked, setIsChecked] = useState(false);
  const [checkedCategory, setCheckedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([100, 100000]); // Adjusted initial state for price
  const [rating, setRating] = useState(0);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCategoryChange = (category) => {
    setCheckedCategory(category);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };
  return (
    <div className="aside">
      <h1>PRODUCT CATEGORIES</h1>
      <div className="aside_part1">
        <form className="checkbox">
          {["Men", "Women", "Kids", "Computer", "TV", "Mobile", "Laptop", "Home Electronic", "Snacks", "Beauty", "Medicines", "Books", "Gaming" , ].map((category) => (
            <div className='lablecheck' key={category}>
              <input
                id={category}
                type="radio"
                name="product-category"
                value={category.toLowerCase()}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </form>
      </div>
      <h1>FILTER BY PRICE</h1>
      <div className="aside_part2">
        <Slider
          range
          min={100}
          max={100000}
          value={priceRange}
          onChange={handlePriceChange}
          trackStyle={[{ backgroundColor: '#9b59b6' }]}
          handleStyle={[{ borderColor: '#9b59b6' }, { borderColor: '#9b59b6' }]}
          railStyle={{ backgroundColor: '#f39c12' }}
        />
        <div className="price-values">
          <span>From: Rs {priceRange[0]}</span>
          <span>To: Rs {priceRange[1]}</span>
        </div>
      </div>
      <h1>FILTER BY RATING</h1>
      <div className="aside_part3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRatingChange(star)}
            style={{ cursor: 'pointer', color: star <= rating ? '#f39c12' : '#ccc' }}
          >
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    </div>
  );
}
