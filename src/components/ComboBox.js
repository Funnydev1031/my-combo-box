import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as DownArrowIcon } from "../assets/images/down-arrow.svg";
import { ReactComponent as AppleIcon } from "../assets/images/apple.svg";
import { ReactComponent as BananaIcon } from "../assets/images/banana.svg";
import { ReactComponent as BlueberryIcon } from "../assets/images/blueberry.svg";
import { ReactComponent as MangoIcon } from "../assets/images/mango.svg";
import "../assets/css/ComboBox.css";

const options = ["Apple", "Banana", "Blueberry", "Mango"];

const fruitIcons = {
  Apple: AppleIcon,
  Banana: BananaIcon,
  Blueberry: BlueberryIcon,
  Mango: MangoIcon,
};

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
      <div className="icon" onClick={toggleDropdown}>
        <DownArrowIcon />
      </div>
      {isOpen && (
        <ul className="options-list">
          {filteredOptions.map((option) => {
            const FruitIcon = fruitIcons[option];
            return (
              <li
                key={option}
                className="option-item"
                role="option"
                aria-selected={option === selectedOption}
                onClick={() => handleOptionClick(option)}
              >
                {FruitIcon && <FruitIcon className="option-icon" />}
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
