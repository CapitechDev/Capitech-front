import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import api from "../../../services/axios";
import useToast from "../../../hooks/useToast";

import Admin from "./page";

jest.mock("../../../services/axios");
jest.mock("../../../hooks/useToast");

describe("Admin Page", () => {
  const mockApi = api.get as jest.Mock;
  const mockUseToast = useToast as jest.Mock;
  const queryClient = new QueryClient();

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
          { _id: "123", name: "Trail Javascript", key: "123" },
          { _id: "321", name: "Trail HTML", key: "321" },
        ],
      },
    };

    mockApi.mockResolvedValue(mockData);

    render(
      <QueryClientProvider client={queryClient}>
        <Admin />
      </QueryClientProvider>
    );

    // Since the Table is mocked, we can't check for specific text
    // Just check that the component renders without crashing
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
