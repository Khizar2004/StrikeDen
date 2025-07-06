import { renderHook, act, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock fetch globally
global.fetch = jest.fn();

// Import the hook after mocking dependencies
import useTrainers from '../../app/admin/hooks/useTrainers';

describe('useTrainers Hook', () => {
  beforeEach(() => {
    fetch.mockClear();
    toast.success.mockClear();
    toast.error.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initial State', () => {
    test('should initialize with empty trainers and loading state', () => {
      // Mock the initial fetch to prevent useEffect from running
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] })
      });

      const { result } = renderHook(() => useTrainers());

      expect(result.current.trainers).toEqual([]);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.isDeleting).toBe(false);
    });
  });

  describe('fetchTrainers', () => {
    test('should fetch trainers successfully', async () => {
      const mockTrainers = [
        { _id: '1', name: 'John Doe', specialization: ['Boxing'] },
        { _id: '2', name: 'Jane Smith', specialization: ['MMA'] }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockTrainers })
      });

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.trainers).toEqual(mockTrainers);
      expect(fetch).toHaveBeenCalledWith('/api/trainers');
    });

    test('should handle fetch error gracefully', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false, error: 'Server error' })
      });

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.trainers).toEqual([]);
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });

    test('should handle network error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.trainers).toEqual([]);
      expect(toast.error).toHaveBeenCalledWith('Failed to fetch trainers');
    });
  });

  describe('addTrainer', () => {
    test('should add trainer successfully', async () => {
      const newTrainer = { name: 'New Trainer', specialization: ['Kickboxing'] };
      const responseTrainer = { _id: '3', ...newTrainer };

      // Mock initial fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] })
      });

      // Mock add trainer fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: responseTrainer })
      });

      // Mock refresh fetch after add
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [responseTrainer] })
      });

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let addResult;
      await act(async () => {
        addResult = await result.current.addTrainer(newTrainer);
      });

      expect(addResult).toBe(true);
      expect(fetch).toHaveBeenCalledWith('/api/trainers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrainer)
      });
      expect(toast.success).toHaveBeenCalledWith('Trainer added successfully');
    });

    test('should handle validation error', async () => {
      const invalidTrainer = { name: '', specialization: [] };

      // Mock initial fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] })
      });

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let addResult;
      await act(async () => {
        addResult = await result.current.addTrainer(invalidTrainer);
      });

      expect(addResult).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Name is required');
    });

    test('should handle server error during add', async () => {
      const newTrainer = { name: 'Test Trainer', specialization: ['Boxing'] };

      // Mock initial fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] })
      });

      // Mock failed add
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false, error: 'Server error' })
      });

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let addResult;
      await act(async () => {
        addResult = await result.current.addTrainer(newTrainer);
      });

      expect(addResult).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Server error');
    });
  });

  describe('deleteTrainer', () => {
    test('should delete trainer successfully', async () => {
      const trainerId = '1';

      // Mock initial fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [{ _id: trainerId, name: 'Test' }] })
      });

      // Mock delete fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });

      // Mock refresh fetch after delete
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] })
      });

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let deleteResult;
      await act(async () => {
        deleteResult = await result.current.deleteTrainer(trainerId);
      });

      expect(deleteResult).toBe(true);
      expect(fetch).toHaveBeenCalledWith(`/api/trainers/${trainerId}`, {
        method: 'DELETE'
      });
      expect(toast.success).toHaveBeenCalledWith('Trainer deleted successfully');
    });

    test('should handle delete error', async () => {
      const trainerId = '1';

      // Mock initial fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [{ _id: trainerId, name: 'Test' }] })
      });

      // Mock failed delete
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let deleteResult;
      await act(async () => {
        deleteResult = await result.current.deleteTrainer(trainerId);
      });

      expect(deleteResult).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Failed to delete trainer');
    });
  });

  describe('Loading States', () => {
    test('should manage isSubmitting state during add operation', async () => {
      const newTrainer = { name: 'Test Trainer', specialization: ['Boxing'] };

      // Mock initial fetch
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: [] })
      });

      const { result } = renderHook(() => useTrainers());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Mock slow add operation
      fetch.mockImplementationOnce(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ success: true })
          }), 100)
        )
      );

      act(() => {
        result.current.addTrainer(newTrainer);
      });

      expect(result.current.isSubmitting).toBe(true);

      await waitFor(() => {
        expect(result.current.isSubmitting).toBe(false);
      });
    });
  });
}); 