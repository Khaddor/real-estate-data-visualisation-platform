// BarChart.spec.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BarChart, { fetchDataFromAPI } from 'pwa/pages/graphs/BarChart.tsx';

// Mock the fetchDataFromAPI function
jest.mock('./BarChart', () => ({
  ...jest.requireActual('./BarChart'),
  fetchDataFromAPI: jest.fn(),
}));

describe('BarChart Component', () => {
  it('renders loading message initially', () => {
    render(<BarChart />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches data and renders chart on successful API response', async () => {
    const mockData = [
      { date: '2020-01-01', nombreVente: 100 },
      { date: '2020-01-02', nombreVente: 150 },
    ];

    // Mock fetchDataFromAPI to resolve with mock data
    fetchDataFromAPI.mockResolvedValue(mockData);

    render(<BarChart />);

    // Wait for the loading message to disappear
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    // Check if the chart is rendered with the mocked data
    expect(screen.getByText('Bar Chart')).toBeInTheDocument();
    expect(screen.getByText('2020-01-01')).toBeInTheDocument();
    expect(screen.getByText('2020-01-02')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('handles API error and shows error message', async () => {
    // Mock fetchDataFromAPI to reject with an error
    fetchDataFromAPI.mockRejectedValue(new Error('API Error'));

    render(<BarChart />);

    // Wait for the loading message to disappear
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    // Check if the error message is displayed
    expect(screen.getByText('Error fetching data: API Error')).toBeInTheDocument();
  });

  it('updates chart when interval, start date, and end date change', async () => {
    // Mock fetchDataFromAPI to resolve with empty data initially and then with new data
    fetchDataFromAPI.mockResolvedValueOnce([]).mockResolvedValueOnce([
      { date: '2020-01-01', nombreVente: 100 },
      { date: '2020-01-02', nombreVente: 150 },
    ]);

    render(<BarChart />);

    // Wait for the loading message to disappear
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    // Check if the initial empty chart is rendered
    expect(screen.getByText('Bar Chart')).toBeInTheDocument();
    expect(screen.queryByText('2020-01-01')).toBeNull();
    expect(screen.queryByText('100')).toBeNull();

    // Change interval, start date, and end date
    userEvent.selectOptions(screen.getByLabelText('Choose an interval'), 'mois');
    userEvent.type(screen.getByLabelText('Start Date'), '2020-01-01');
    userEvent.type(screen.getByLabelText('End Date'), '2020-01-02');

    // Wait for the updated chart to render
    await waitFor(() => {
      expect(screen.getByText('Bar Chart')).toBeInTheDocument();
      expect(screen.getByText('2020-01-01')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
    });
  });

  // Add more test cases based on your component's behavior and interactions
});
