// Mock React's use hook for params
import { render, screen, waitFor } from "@testing-library/react";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@testing-library/jest-dom";
import api from "../../../../services/axios";

import Trails from "./page";

const MockSingleTrailTemplate = jest.fn();

jest.mock("../../../../services/axios");
jest.mock("../../../../lib/trail/public-queries");
jest.mock("next/navigation");
jest.mock('../../../../components/UI/templates/singleTrailTemplate', () => ({
  default: () => <div>Trail Name</div>
}));

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe("Trails Page", () => {
  const mockApi = api.get as jest.Mock;

  const mockTrailData = {
    _id: "1",
    name: "Trail Name",
    subtitle: "Trail Subtitle",
    description: "<p>Trail Description</p>",
    video_title: "Video Title",
    video_description: "Video Description",
    references: "https://youtu.be/0hVXjqHwvI0?si=EDTbmdryyI_fsDlo",
    iframe_references:
      "https://www.youtube.com/embed/0hVXjqHwvI0?si=EDTbmdryyI_fsDlo",
  };

  beforeEach(() => {
    mockApi.mockResolvedValue({
      status: 200,
      data: { data: mockTrailData },
    });
    // Mock findOnePublicTrailCached
    const mockFindOne = jest.requireMock("../../../../lib/trail/public-queries").findOnePublicTrailCached;
    mockFindOne.mockReturnValue(Promise.resolve(mockTrailData));
  });

  it("renders the trail data correctly", async () => {
    render(<Trails params={Promise.resolve({ id: "1" })} />, { wrapper: AllTheProviders });

    await waitFor(() => {
      expect(screen.getByText("Trail Name")).toBeInTheDocument();
      expect(screen.getByText("Trail Subtitle")).toBeInTheDocument();
      expect(screen.getByText("Trail Description")).toBeInTheDocument();
      expect(screen.getByText("Video Title")).toBeInTheDocument();
      expect(screen.getByText("Video Description")).toBeInTheDocument();

      const link = screen.getByRole("link", { name: "Video Title" });

      expect(link).toHaveAttribute(
        "href",
        "https://youtu.be/0hVXjqHwvI0?si=EDTbmdryyI_fsDlo"
      );

      const iframe = screen.getByTitle("YouTube Video");

      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        "src",
        "https://www.youtube.com/embed/0hVXjqHwvI0?si=EDTbmdryyI_fsDlo"
      );
    });
  });

  it("shows loading spinner while fetching data", async () => {
    const mockFindOne = jest.requireMock("../../../../lib/trail/public-queries").findOnePublicTrailCached;
    mockFindOne.mockReturnValue(new Promise(() => {})); // pending

    render(
      <Suspense fallback={<div>Carregando trilhas</div>}>
        <Trails params={Promise.resolve({ id: "1" })} />
      </Suspense>,
      { wrapper: AllTheProviders }
    );

    expect(screen.getByText("Carregando trilhas")).toBeInTheDocument();
  });

  it("shows error message on API error", async () => {
    const mockFindOne = jest.requireMock("../../../../lib/trail/public-queries").findOnePublicTrailCached;
    const mockNotFound = jest.requireMock("next/navigation").notFound;
    mockFindOne.mockReturnValue(Promise.resolve(null));

    render(<Trails params={Promise.resolve({ id: "1" })} />, { wrapper: AllTheProviders });

    await waitFor(() => {
      expect(mockNotFound).toHaveBeenCalled();
    });
  });
});
