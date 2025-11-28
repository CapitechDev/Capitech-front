import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

import "@testing-library/jest-dom";
import { signIn } from "next-auth/react";

import useToast from "../../../hooks/useToast";

import LoginPage from "./page";

jest.mock("next-auth/react");
jest.mock("../../../hooks/useToast");

describe("LoginPage", () => {
  const mockSignIn = signIn as jest.Mock;
  const mockUseToast = useToast as jest.Mock;

  beforeEach(() => {
    mockUseToast.mockReturnValue({
      showSuccessToast: jest.fn(),
      showErrorToast: jest.fn(),
    });
  });

  it("renders the login form", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registre-se/i })
    ).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<LoginPage />);

    const toggleButton = screen.getByLabelText("toggle password visibility");
    const passwordInput = screen.getByLabelText("Senha");

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

  it("shows success toast on successful login", async () => {
    mockSignIn.mockResolvedValue({ error: null });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "password" },
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    await waitFor(() => {
      expect(mockUseToast().showSuccessToast).toHaveBeenCalledWith(
        "Login realizado com sucesso",
        "/admin"
      );
    });
  });

  it("shows error toast on failed login", async () => {
    mockSignIn.mockResolvedValue({ error: "Invalid credentials" });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "wrongpassword" },
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    await waitFor(() => {
      expect(mockUseToast().showErrorToast).toHaveBeenCalledWith(
        "Erro ao realizar login: Invalid credentials"
      );
    });
  });
});
