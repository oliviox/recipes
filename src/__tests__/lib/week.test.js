import { weekDiff, getStoredWeek, setStoredLastDate, getStoredLastDate, setStoredWeek } from '../../lib/week';
import { describe, expect, beforeEach, it } from "bun:test";

import LocalStorageMock from '../mocks/LocalStorageMock.js';

global.localStorage = new LocalStorageMock();

describe('week.js', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('weekDiff', () => {
    it('should return 0 and set lastDate if lastDate is not in localStorage', () => {
      const week = weekDiff(localStorage);
      expect(week).toBe(0);
      expect(getStoredLastDate(localStorage)).not.toBeNull();
    });

    it('should return the correct week number based on the lastDate', () => {
      const lastDate = new Date();
      lastDate.setDate(lastDate.getDate() - 15); // 15 days ago
      setStoredLastDate(localStorage, lastDate);

      const week = weekDiff(localStorage);
      expect(week).toBe(2); // 15 days is 2 weeks and 1 day, so week 2 in a 4-week cycle
    });

    it('should return the same week number if date is in the same week', () => {
      const lastDate = new Date('2024-05-13'); // Monday
      setStoredLastDate(localStorage, lastDate);


      const week = weekDiff(localStorage, new Date('2024-05-15')); // Wednesday
      expect(week).toBe(0);
    });

    it('should return the correct week number if date is in the next week', () => {
      const lastDate = new Date('2024-05-12'); // Sunday last week
      setStoredLastDate(localStorage, lastDate);

      const week = weekDiff(localStorage, new Date('2024-05-15')); // Wednesday
      expect(week).toBe(1);
    });

    it('should handle dates exactly on the boundary of a week', () => {
        const lastDate = new Date('2024-05-12'); // Sunday
        setStoredLastDate(localStorage, lastDate);
    
        const week = weekDiff(localStorage, new Date('2024-05-19')); // Next Sunday
        expect(week).toBe(1);
      });
    
      it('should handle multiple weeks span correctly', () => {
        const lastDate = new Date('2024-04-01'); // 1st April
        setStoredLastDate(localStorage, lastDate);
    
        const week = weekDiff(localStorage, new Date('2024-05-15')); // 15th May
        expect(week).toBe(6); // 6 weeks span
      });
    
      it('should handle invalid dates in localStorage gracefully', () => {
        localStorage.setItem('lastDate', 'invalid-date');
        const week = weekDiff(localStorage);
        expect(week).toBe(0);
      });
  });

  describe('getStoredWeek', () => {
    it('should return 0 if selectedWeek is not in localStorage', () => {
      const week = getStoredWeek(localStorage);
      expect(week).toBe(0);
    });

    it('should return the stored week if selectedWeek is in localStorage', () => {
      setStoredWeek(localStorage, 2);
      const week = getStoredWeek(localStorage);
      expect(week).toBe(2);
    });
  });
});