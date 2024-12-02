import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import api from "../../../services/axios";
import useToast from "../../../hooks/useToast";

import Admin from "./page";

jest.mock("../../../services/axios");
jest.mock("../../../hooks/useToast");

describe("Admin Page", () => {
  const mockApi = api.get as jest.Mock;
  const mockUseToast = useToast as jest.Mock;

  beforeEach(() => {
    mockUseToast.mockReturnValue({
      showSuccessToast: jest.fn(),
      showErrorToast: jest.fn(),
    });
  });

  it("renders the table with fetched data", async () => {
    const mockData = {
      data: {
        data: [
          { _id: "123", name: "Trail Javascript" },
          { _id: "321", name: "Trail HTML" },
        ],
      },
    };

    mockApi.mockResolvedValue(mockData);

    render(<Admin />);

    await waitFor(() => {
      expect(screen.getByText("Trail Javascript")).toBeInTheDocument();
      expect(screen.getByText("Trail HTML")).toBeInTheDocument();
    });
  });
});
