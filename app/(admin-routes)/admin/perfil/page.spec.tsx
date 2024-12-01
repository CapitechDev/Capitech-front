import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";

import useToast from "../../../../hooks/useToast";
import api from "../../../../services/axios";

import AdminProfilePage from "./page";

jest.mock("next-auth/react");
jest.mock("../../../../hooks/useToast");
jest.mock("../../../../services/axios");

describe("AdminProfilePage", () => {
  const mockUseSession = useSession as jest.Mock;
  const mockUseToast = useToast as jest.Mock;
  const mockApi = api.put as jest.Mock;

  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          _id: "123",
          email: "test@example.com",
          name: "Test User",
        },
      },
    });

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

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);

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

    fireEvent.submit(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockUseToast().showSuccessToast).toHaveBeenCalledWith(
        "User updated! Faça login novamente."
      );
    });
  });

  it("shows error toast on failed form submission", async () => {
    mockApi.mockResolvedValue({
      data: { success: false, message: "Error updating user" },
    });

    render(<AdminProfilePage />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Updated User" },
    });
    fireEvent.change(screen.getByLabelText("Tema"), {
      target: { value: "updated@example.com" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(mockUseToast().showErrorToast).toHaveBeenCalledWith(
        "Error updating user"
      );
    });
  });
});
