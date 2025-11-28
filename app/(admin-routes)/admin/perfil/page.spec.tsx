import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

import "@testing-library/jest-dom";
import { useSession, signOut } from "next-auth/react";

import useToast from "../../../../hooks/useToast";
import api from "../../../../services/axios";
import apiServer from "../../../../services/axios-server";

import AdminProfilePage from "./page";

jest.mock("next-auth/react");
jest.mock("../../../../hooks/useToast");
jest.mock("../../../../services/axios");
jest.mock("../../../../services/axios-server");

describe("AdminProfilePage", () => {
  const mockUseSession = useSession as jest.Mock;
  const mockSignOut = signOut as jest.Mock;
  const mockUseToast = useToast as jest.Mock;
  const mockApi = api.put as jest.Mock;

  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: "123",
          email: "test@example.com",
          name: "Test User",
        },
      },
    });
    mockSignOut.mockResolvedValue(undefined);
    mockUseToast.mockReturnValue({
      showSuccessToast: jest.fn(),
      showErrorToast: jest.fn(),
    });
  });

  it("renders the form with initial values", () => {
    render(<AdminProfilePage />);

    expect(screen.getByLabelText("Nome")).toHaveValue("Test User");
    expect(screen.getByLabelText("Tema")).toHaveValue("test@example.com");
    expect(
      screen.getByLabelText(
        "Nova Senha (Caso queira manter a atual, deixe o campo vazio!)"
      )
    ).toHaveValue("");
  });

  it("toggles password visibility", () => {
    render(<AdminProfilePage />);

    const toggleButton = screen.getByLabelText("toggle password visibility");
    const passwordInput = screen.getByLabelText(
      "Nova Senha (Caso queira manter a atual, deixe o campo vazio!)"
    );

    expect(passwordInput).toHaveAttribute("type", "password");

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(passwordInput).toHaveAttribute("type", "text");

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows success toast on successful form submission", async () => {
    mockApi.mockResolvedValue({
      data: { success: true, message: "User updated" },
    });

    render(<AdminProfilePage />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Updated User" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "updated@example.com" },
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /enviar/i }));
    });

    await waitFor(() => {
      expect(mockUseToast().showSuccessToast).toHaveBeenCalledWith(
        "Usuário atualizado com sucesso! Faça login novamente."
      );
    });
  });

  it("shows error toast on failed form submission", async () => {
    mockApi.mockRejectedValue(new Error("Error updating user"));

    render(<AdminProfilePage />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Updated User" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "updated@example.com" },
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /enviar/i }));
    });

    await waitFor(() => {
      expect(mockUseToast().showErrorToast).toHaveBeenCalledWith(
        "Erro ao atualizar usuário."
      );
    });
  });
});
