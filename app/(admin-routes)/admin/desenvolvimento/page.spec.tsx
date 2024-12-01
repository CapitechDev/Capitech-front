import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import AdminDevelopment from "./page";

describe("AdminDevelopment", () => {
  it("should render the label with the correct text", () => {
    render(<AdminDevelopment />);
    const labelElement = screen.getByLabelText("Insira seu código aqui!");

    expect(labelElement).toBeInTheDocument();
  });

  it("should render the textarea", () => {
    render(<AdminDevelopment />);
    const textareaElement = screen.getByRole("textbox");

    expect(textareaElement).toBeInTheDocument();
  });

  it("should update the textarea value on change", () => {
    render(<AdminDevelopment />);
    const textareaElement = screen.getByRole("textbox") as HTMLTextAreaElement;

    fireEvent.change(textareaElement, { target: { value: "<p>Test</p>" } });
    expect(textareaElement.value).toBe("<p>Test</p>");
  });

  it("should render the h3 with the correct text", () => {
    render(<AdminDevelopment />);
    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Código Renderizado");
  });
});
