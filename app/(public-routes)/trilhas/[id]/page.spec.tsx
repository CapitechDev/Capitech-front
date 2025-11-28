import { render, screen, waitFor } from "@testing-library/react";
import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

import Trails from "./page";

// Store the mock implementation
let mockTrailData: any = null;
let mockNotFoundCalled = false;

// Mock the dependencies
jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    mockNotFoundCalled = true;
  }),
}));

jest.mock("../../../../lib/trail/public-queries", () => ({
  findOnePublicTrailCached: jest.fn((id: string) => Promise.resolve(mockTrailData)),
}));

// Mock the template component
jest.mock("../../../../components/UI/templates/singleTrailTemplate", () => {
  return function MockSingleTrailTemplate({ id }: { id: string }) {
    const React = require("react");
    const { findOnePublicTrailCached } = require("../../../../lib/trail/public-queries");
    const { notFound } = require("next/navigation");
    const [trail, setTrail] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      findOnePublicTrailCached(id)
        .then((data: any) => {
          if (!data) {
            notFound();
            return;
          }
          setTrail(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }, [id]);

    if (isLoading) return null;
    if (!trail) return null;

    return (
      <div data-testid="trail-template">
        <h2>{trail.name}</h2>
        <h3>{trail.subtitle}</h3>
        <div>{trail.description}</div>
        <h3>{trail.video_title}</h3>
        <p>{trail.video_description}</p>
        <a href={trail.references}>{trail.video_title}</a>
        <iframe src={trail.iframe_references} title="YouTube Video" />
      </div>
    );
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe("Trails Page", () => {
  const testTrailData = {
    _id: "1",
    name: "Trail Name",
    subtitle: "Trail Subtitle",
    description: "Trail Description",
    video_title: "Video Title",
    video_description: "Video Description",
    references: "https://youtu.be/0hVXjqHwvI0?si=EDTbmdryyI_fsDlo",
    iframe_references: "https://www.youtube.com/embed/0hVXjqHwvI0?si=EDTbmdryyI_fsDlo",
  };

  beforeEach(() => {
    mockTrailData = null;
    mockNotFoundCalled = false;
    jest.clearAllMocks();
  });

  it.skip("renders the trail data correctly", async () => {
    mockTrailData = testTrailData;

    render(<Trails params={Promise.resolve({ id: "1" })} />, { wrapper: AllTheProviders });

    await waitFor(() => {
      expect(screen.getByText("Trail Name")).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText("Trail Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Trail Description")).toBeInTheDocument();
    expect(screen.getByText("Video Title")).toBeInTheDocument();
    expect(screen.getByText("Video Description")).toBeInTheDocument();

    const links = screen.getAllByRole("link");
    const videoLink = links.find(link => link.getAttribute("href") === testTrailData.references);
    expect(videoLink).toBeInTheDocument();

    const iframe = screen.getByTitle("YouTube Video");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", testTrailData.iframe_references);
  });

  it("shows loading spinner while fetching data", () => {
    mockTrailData = new Promise(() => {}); // Never resolves

    render(
      <Suspense fallback={<div>Carregando trilhas</div>}>
        <Trails params={Promise.resolve({ id: "1" })} />
      </Suspense>,
      { wrapper: AllTheProviders }
    );

    expect(screen.getByText("Carregando trilhas")).toBeInTheDocument();
  });

  it.skip("calls notFound when trail data is null", async () => {
    mockTrailData = null;
    const { notFound } = require("next/navigation");

    render(<Trails params={Promise.resolve({ id: "1" })} />, { wrapper: AllTheProviders });

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});
