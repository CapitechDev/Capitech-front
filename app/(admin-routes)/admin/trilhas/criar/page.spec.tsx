import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api from "../../../../../services/axios";
import apiServer from "../../../../../services/axios-server";
import useToast from "../../../../../hooks/useToast";
import { createTrailAction } from "../../../../../actions/trails/create-trail.action";

import AdminCreateTrail from "./page";

jest.mock("../../../../../services/axios");
jest.mock("../../../../../services/axios-server");
jest.mock("../../../../../hooks/useToast");
jest.mock("../../../../../actions/trails/create-trail.action");

describe("AdminCreateTrail Page", () => {
  const mockApi = api.post as jest.Mock;
  const mockApiServer = apiServer.post as jest.Mock;
  const mockUseToast = useToast as jest.Mock;
  const mockCreateTrailAction = createTrailAction as jest.Mock;
  const queryClient = new QueryClient();
  const mockToast = {
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn(),
  };

  beforeEach(() => {
    mockUseToast.mockReturnValue(mockToast);
    mockCreateTrailAction.mockResolvedValue({ success: true });
  });

  it("renders the create trail form", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AdminCreateTrail />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Tema")).toBeInTheDocument();
    expect(screen.getByLabelText("Conteúdo")).toBeInTheDocument();
    expect(screen.getByLabelText("Título do Vídeo")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição do Vídeo")).toBeInTheDocument();
    expect(screen.getByLabelText("Referências do Vídeo")).toBeInTheDocument();
    expect(screen.getByLabelText("Referências do Iframe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("shows success toast on successful trail creation", async () => {
    const user = userEvent.setup();
    mockCreateTrailAction.mockResolvedValue({ success: true });

    render(
      <QueryClientProvider client={queryClient}>
        <AdminCreateTrail />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test Trail" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "Test Theme" },
    });
    fireEvent.change(screen.getByLabelText("Conteúdo"), {
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

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockCreateTrailAction).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Trail",
          subtitle: "Test Theme",
          description: "Test Content",
          video_title: "Test Video Title",
          video_description: "Test Video Description",
          references: "https://example.com",
          iframe_references: "https://www.youtube.com/embed/example",
        })
      );
    });
  });

  it("shows error toast on failed trail creation", async () => {
    const user = userEvent.setup();
    mockCreateTrailAction.mockRejectedValue(new Error("Error creating trail"));

    render(
      <QueryClientProvider client={queryClient}>
        <AdminCreateTrail />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test Trail" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "Test Theme" },
    });
    fireEvent.change(screen.getByLabelText("Conteúdo"), {
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

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockToast.showErrorToast).toHaveBeenCalledWith(
        "Error creating trail"
      );
    });
  });

  it("shows error toast on API error", async () => {
    const user = userEvent.setup();
    mockCreateTrailAction.mockRejectedValue(new Error("API error"));

    render(
      <QueryClientProvider client={queryClient}>
        <AdminCreateTrail />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test Trail" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "Test Theme" },
    });
    fireEvent.change(screen.getByLabelText("Conteúdo"), {
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

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockToast.showErrorToast).toHaveBeenCalledWith(
        "API error"
      );
    });
  });
});
