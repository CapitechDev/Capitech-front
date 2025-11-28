import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Home from "./page";

jest.mock("../../components/UI/organisms/trailsSection", () => ({
  __esModule: true,
  default: () => <div>Mocked Trails Section</div>,
}));

describe("Home", () => {
  it("renders the main sections", () => {
    render(<Home />);

    // Check for main heading in trails section
    expect(screen.getByText("Escolha uma tecnologia para começar sua jornada!")).toBeInTheDocument();

    // Check for button text
    expect(screen.getByText("Conheça a FATEC")).toBeInTheDocument();

    // Check for some content text
    expect(screen.getByText("Qual tecnologia você quer trilhar?")).toBeInTheDocument();
  });

  it("renders the home frames", () => {
    render(<Home />);

    // Check for frame titles
    expect(screen.getByText("Trilhas de aprendizagem")).toBeInTheDocument();
    expect(screen.getByText("Seu Desenvolvimento")).toBeInTheDocument();
    expect(screen.getByText("Vestibular FATEC")).toBeInTheDocument();
  });

  it("renders the home contents", () => {
    render(<Home />);

    // Check for some content titles
    expect(screen.getByText("O lugar certo para aprender programação e testar conhecimentos.")).toBeInTheDocument();
    expect(screen.getByText("Aprendendo com quem aprende.")).toBeInTheDocument();
    expect(screen.getByText("Sobre a FATEC.")).toBeInTheDocument();
  });

  it("renders the mocked trails section", () => {
    render(<Home />);

    expect(screen.getByText("Mocked Trails Section")).toBeInTheDocument();
  });

  it("renders the correct number of home frames", () => {
    render(<Home />);

    // Assuming HomeCardFrames renders the titles
    const frames = screen.getAllByText(/Trilhas de aprendizagem|Seu Desenvolvimento|Vestibular FATEC/);
    expect(frames).toHaveLength(3);
  });

  it("renders the correct number of home contents", () => {
    render(<Home />);

    // Check for the titles of homeContents
    const contents = screen.getAllByText(/Qual tecnologia você quer trilhar?|O lugar certo para aprender programação e testar conhecimentos.|Aprendendo com quem aprende.|Aprendizado Guiado Colaboratiovo.|Sobre a FATEC.|Curso de Desenvolvimento de Software Multiplataforma/);
    expect(contents).toHaveLength(6);
  });

  it("renders links in home frames", () => {
    render(<Home />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(3); // 3 frames

    expect(links[0]).toHaveAttribute("href", "#trilhas");
    expect(links[1]).toHaveAttribute("href", "/login");
    expect(links[2]).toHaveAttribute("href", "/vestibular");
  });
});