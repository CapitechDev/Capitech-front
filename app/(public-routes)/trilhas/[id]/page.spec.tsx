import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import api from "../../../../services/axios";

import Trails from "./page";

jest.mock("../../../../services/axios");

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
  });

  it("renders the trail data correctly", async () => {
    render(<Trails params={{ id: "1" }} />);

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

  it("shows loading spinner while fetching data", () => {
    render(<Trails params={{ id: "1" }} />);

    expect(screen.getByText("Carregando")).toBeInTheDocument();
  });

  it("shows error message on API error", async () => {
    mockApi.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<Trails params={{ id: "1" }} />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Você será redirecionado para a página inicial em instantes!"
        )
      ).toBeInTheDocument();
    });
  });
});
