import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Views from "../pages/views";

describe("Views Component", () => {
  test("renders without errors", () => {
    render(<Views />);
    expect(screen.getByText("Chart Visualisation")).toBeInTheDocument();
  });

  test("changes active chart when clicking on the NavBar", () => {
    render(<Views />);

    // Initially, LineChartComponent is visible
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    expect(screen.queryByTestId("bar-chart")).toBeNull();
    expect(screen.queryByTestId("pie-chart")).toBeNull();

    // Click on Bar Chart in the NavBar
    userEvent.click(screen.getByTestId("nav-bar-bar-chart"));

    // Now, BarChartComponent should be visible
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.queryByTestId("line-chart")).toBeNull();
    expect(screen.queryByTestId("pie-chart")).toBeNull();

    // Click on Pie Chart in the NavBar
    userEvent.click(screen.getByTestId("nav-bar-pie-chart"));

    // Now, PieChart should be visible
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    expect(screen.queryByTestId("line-chart")).toBeNull();
    expect(screen.queryByTestId("bar-chart")).toBeNull();
  });
});
