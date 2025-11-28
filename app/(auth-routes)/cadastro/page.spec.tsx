import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";

import "@testing-library/jest-dom";
import api from "../../../services/axios";
import useToast from "../../../hooks/useToast";

import Register from "./page";

jest.mock("../../../services/axios");
jest.mock("../../../hooks/useToast");

describe("Register Page", () => {
  const mockApi = api.post as jest.Mock;
  const mockUseToast = useToast as jest.Mock;

  beforeEach(() => {
    mockUseToast.mockReturnValue({
      showSuccessToast: jest.fn(),
      showErrorToast: jest.fn(),
    });
  });

  it("renders the registration form", () => {
    render(<Register />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Código de Admin.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registre-se/i })
    ).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<Register />);

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

  it("shows success toast on successful registration", async () => {
    mockApi.mockResolvedValue({
      data: { success: true, message: "User created successfully" },
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Código de Admin."), {
      target: { value: "admin123" },
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /registre-se/i }));
    });

    await waitFor(() => {
      expect(mockUseToast().showSuccessToast).toHaveBeenCalledWith(
        "User created successfully",
        "/login"
      );
    });
  });

  it("shows error toast on failed registration", async () => {
    mockApi.mockResolvedValue({
      data: { success: false, message: "Error creating user" },
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Código de Admin."), {
      target: { value: "admin123" },
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /registre-se/i }));
    });

    await waitFor(() => {
      expect(mockUseToast().showErrorToast).toHaveBeenCalledWith(
        "Error creating user"
      );
    });
  });

  it("shows error toast on API error", async () => {
    mockApi.mockRejectedValue(new Error("API error"));

    render(<Register />);

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Código de Admin."), {
      target: { value: "admin123" },
    });

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /registre-se/i }));
    });

    await waitFor(() => {
      expect(mockUseToast().showErrorToast).toHaveBeenCalledWith(
        "Erro ao criar usuário."
      );
    });
  });
});
