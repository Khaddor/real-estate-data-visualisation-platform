import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '../pages/index';

// Mock the LandingPage component
jest.mock('../components/LandingPage', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testid="landing-page-mock"></div>),
  };
});

describe('Example Component', () => {
  test('renders without errors', () => {
    render(<Index />);
    // Ensure that the LandingPage component is rendered
    expect(screen.getByTestId('landing-page-mock')).toBeInTheDocument();
  });

});
