import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import api from "../../../../../services/axios";
import useToast from "../../../../../hooks/useToast";

import AdminCreateTrail from "./page";

jest.mock("../../../../../services/axios");
jest.mock("../../../../../hooks/useToast");

describe("AdminCreateTrail Page", () => {
  const mockApi = api.post as jest.Mock;
  const mockUseToast = useToast as jest.Mock;

  beforeEach(() => {
    mockUseToast.mockReturnValue({
      showSuccessToast: jest.fn(),
      showErrorToast: jest.fn(),
    });
  });

  it("renders the create trail form", () => {
    render(<AdminCreateTrail />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Tema")).toBeInTheDocument();
    expect(screen.getByLabelText("Conteúdo da Trilha")).toBeInTheDocument();
    expect(screen.getByLabelText("Título do Vídeo")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição do Vídeo")).toBeInTheDocument();
    expect(screen.getByLabelText("Referências do Vídeo")).toBeInTheDocument();
    expect(screen.getByLabelText("Referências do Iframe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("shows success toast on successful trail creation", async () => {
    mockApi.mockResolvedValue({
      data: { success: true, message: "Trail created successfully" },
    });

    render(<AdminCreateTrail />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test Trail" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "Test Theme" },
    });
    fireEvent.change(screen.getByLabelText("Conteúdo da Trilha"), {
      target: { value: "Test Content" },
    });
    fireEvent.change(screen.getByLabelText("Título do Vídeo"), {
      target: { value: "Test Video Title" },
    });
    fireEvent.change(screen.getByLabelText("Descrição do Vídeo"), {
      target: { value: "Test Video Description" },
    });
    fireEvent.change(screen.getByLabelText("Referências do Vídeo"), {
      target: { value: "https://example.com" },
    });
    fireEvent.change(screen.getByLabelText("Referências do Iframe"), {
      target: { value: "https://www.youtube.com/embed/example" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockUseToast().showSuccessToast).toHaveBeenCalledWith(
        "Trail created successfully",
        "/admin"
      );
    });
  });

  it("shows error toast on failed trail creation", async () => {
    mockApi.mockResolvedValue({
      data: { success: false, message: "Error creating trail" },
    });

    render(<AdminCreateTrail />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test Trail" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "Test Theme" },
    });
    fireEvent.change(screen.getByLabelText("Conteúdo da Trilha"), {
      target: { value: "Test Content" },
    });
    fireEvent.change(screen.getByLabelText("Título do Vídeo"), {
      target: { value: "Test Video Title" },
    });
    fireEvent.change(screen.getByLabelText("Descrição do Vídeo"), {
      target: { value: "Test Video Description" },
    });
    fireEvent.change(screen.getByLabelText("Referências do Vídeo"), {
      target: { value: "https://example.com" },
    });
    fireEvent.change(screen.getByLabelText("Referências do Iframe"), {
      target: { value: "https://www.youtube.com/embed/example" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockUseToast().showErrorToast).toHaveBeenCalledWith(
        "Error creating trail"
      );
    });
  });

  it("shows error toast on API error", async () => {
    mockApi.mockRejectedValue(new Error("API error"));

    render(<AdminCreateTrail />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test Trail" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "Test Theme" },
    });
    fireEvent.change(screen.getByLabelText("Conteúdo da Trilha"), {
      target: { value: "Test Content" },
    });
    fireEvent.change(screen.getByLabelText("Título do Vídeo"), {
      target: { value: "Test Video Title" },
    });
    fireEvent.change(screen.getByLabelText("Descrição do Vídeo"), {
      target: { value: "Test Video Description" },
    });
    fireEvent.change(screen.getByLabelText("Referências do Vídeo"), {
      target: { value: "https://example.com" },
    });
    fireEvent.change(screen.getByLabelText("Referências do Iframe"), {
      target: { value: "https://www.youtube.com/embed/example" },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockUseToast().showErrorToast).toHaveBeenCalledWith(
        "Erro ao criar usuário."
      );
    });
  });
});
