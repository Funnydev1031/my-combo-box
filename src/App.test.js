import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders the combo box component", () => {
    render(<App />);
    const comboBoxElement = screen.getByTestId("combo-box");
    expect(comboBoxElement).toBeInTheDocument();
  });

  test("selects an option from the combo box", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("Choose a Fruit");

    fireEvent.click(inputElement);
    const optionElement = screen.getByText("Apple");
    fireEvent.click(optionElement);

    expect(inputElement.value).toBe("Apple");
  });
});
