import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Vestibular from "./page";

describe("Vestibular", () => {
  it("renders a heading with 'Vestibular FATEC'", () => {
    render(<Vestibular />);

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Vestibular FATEC");
  });

  it("renders the image with the alt text 'Ícone de contato'", () => {
    render(<Vestibular />);

    const image = screen.getByAltText("Ícone de contato.");

    expect(image).toBeInTheDocument();
  });

  it("renders the Fatec image with alt text 'Imagem Fatec Votorantim no estado de São Paulo'", () => {
    render(<Vestibular />);

    const fatecImage = screen.getByAltText(
      "Imagem Fatec Votorantim no estado de São Paulo."
    );

    expect(fatecImage).toBeInTheDocument();
  });

  it("renders a button with the text 'Inscreva-se no Vestibular FATEC!' and links to the correct URL", () => {
    render(<Vestibular />);
  
    // Busca o botão pelo texto
    const button = screen.getByText(/Inscreva-se no Vestibular FATEC!/i);
  
    // Verifica se o botão está no documento
    expect(button).toBeInTheDocument();
  
    // Verifica se o botão é um link e tem o href correto
    expect(button.tagName).toBe('A');
    expect(button).toHaveAttribute("href", "https://www.cps.sp.gov.br/fatec/vestibular/");
  });
  

  it("renders a list of courses offered by the Fatec Votorantim", () => {
    render(<Vestibular />);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems).toHaveLength(3);
  });

  it("renders text about Fatec Votorantim", () => {
    render(<Vestibular />);

    const paragraph = screen.getByText(
      /A Faculdade de Tecnologia \(Fatec\) chegou na cidade de Votorantim em dezembro de 2022/i
    );

    expect(paragraph).toBeInTheDocument();
  });
});
