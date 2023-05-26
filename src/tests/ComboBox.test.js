import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ComboBox from "../components/ComboBox";

describe("ComboBox", () => {
  test("renders the input field", () => {
    render(<ComboBox />);
    const inputElement = screen.getByPlaceholderText("Choose a Fruit");
    expect(inputElement).toBeInTheDocument();
  });

  test("opens the dropdown on input click", () => {
    render(<ComboBox />);
    const inputElement = screen.getByPlaceholderText("Choose a Fruit");

    fireEvent.click(inputElement);
    const optionElement = screen.getByText("Apple");
    expect(optionElement).toBeInTheDocument();
  });

  test("selects an option from the dropdown", () => {
    render(<ComboBox />);
    const inputElement = screen.getByPlaceholderText("Choose a Fruit");

    fireEvent.click(inputElement);
    const optionElement = screen.getByText("Apple");
    fireEvent.click(optionElement);

    expect(inputElement.value).toBe("Apple");
  });

  test("filters options based on input value", () => {
    render(<ComboBox />);
    const inputElement = screen.getByPlaceholderText("Choose a Fruit");

    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "Banana" } });

    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(1);
    expect(optionElements[0].textContent).toBe("banana.svgBanana");
  });

  test("closes the dropdown on outside click", () => {
    render(<ComboBox />);
    const inputElement = screen.getByPlaceholderText("Choose a Fruit");

    fireEvent.click(inputElement);
    const optionElement = screen.getByText("Apple");
    expect(optionElement).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(optionElement).not.toBeInTheDocument();
  });
});
