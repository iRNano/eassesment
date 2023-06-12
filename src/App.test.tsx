import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Card from './components/Card';
import axios from 'axios';
import {vi} from 'vitest'
// Mock axios.get to return a mock user data
vi.mock('axios')

const mockUserData = {
    results:[{
  name: {
    first: 'John',
    last: 'Doe'
  },
  email: 'johndoe@example.com',
}]};

describe('Card component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    render(<Card />);
    expect(screen.getAllByText('Loading...')).toHaveLength(2)
  });

  it('renders user data after fetching', async () => {
    vi.mocked(axios,true).get.mockResolvedValueOnce({ data: mockUserData });
    render(<Card />);

    // Verify that the user data is rendered
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText(mockUserData.results[0].email)).toBeInTheDocument();
    });
  });

  it('fetches new data when refresh button is clicked', async () => {
    vi.mocked(axios,true).get.mockResolvedValueOnce({ data: mockUserData });
    render(<Card />);

    // Verify that the user data is rendered initially
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText(mockUserData.results[0].email)).toBeInTheDocument();
    });

    // Mock axios.get implementation to return updated mock user data
    const updatedMockUserData = {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
    };
    vi.mocked(axios,true).get.mockResolvedValueOnce({ data: updatedMockUserData });

    // Click the refresh button
    fireEvent.click(screen.getByText('Refresh'));

    // Verify that the updated user data is rendered after the refresh
    await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText(mockUserData.results[0].email)).toBeInTheDocument();
    });
  });

  it('handles error when fetching user data', async () => {
    // Mock axios.get implementation to throw an error
    const errorMessage = 'Failed to fetch user data';
    const spy = vi.spyOn(console,'log')
    
    console.log(errorMessage);
    render(<Card />);

    await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(errorMessage);
    })
    
  });
});
