import React, { useState, useEffect, useRef } from "react";

const options = ["Apple", "Banana", "Blueberry", "Mango"];

const ComboBox = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const comboRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (comboRef.current && !comboRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSelectedOption(inputValue);
    filterOptions(inputValue);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    inputRef.current.blur();
  };

  const filterOptions = (inputValue) => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="combo-box" ref={comboRef} data-testid="combo-box">
      <input
        className="input-box"
        type="text"
        value={selectedOption}
        onChange={handleInputChange}
        onClick={toggleDropdown}
        placeholder="Choose a Fruit"
        autoComplete="off"
        ref={inputRef}
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="option-item"
              role="option"
              aria-selected={option === selectedOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
