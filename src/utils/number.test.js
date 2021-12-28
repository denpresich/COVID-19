/* eslint-disable no-undef */
import { formatShortNumber, formatNumber } from './number';

describe('Utils - number', () => {
  describe('formatShortNumber', () => {
    test('1_000_000_000 -> 1B', () =>
      expect(formatShortNumber(1_000_000_000)).toBe('1B'));
    test('-1_000_000_000 -> -1B', () =>
      expect(formatShortNumber(-1_000_000_000)).toBe('-1B'));
    test('1_000_000 -> 1M', () =>
      expect(formatShortNumber(1_000_000)).toBe('1M'));
    test('-1_000_000 -> -1M', () =>
      expect(formatShortNumber(-1_000_000)).toBe('-1M'));
    test('1_000 -> 1K', () => expect(formatShortNumber(1_000)).toBe('1K'));
    test('-1_000 -> -1K', () => expect(formatShortNumber(-1_000)).toBe('-1K'));
  });

  describe('formatNumber', () => {
    test('1_000_000_000 -> 1,000,000,000', () =>
      expect(formatNumber(1_000_000_000)).toBe('1,000,000,000'));
    test('1_000_000 -> 1,000,000', () =>
      expect(formatNumber(1_000_000)).toBe('1,000,000'));
    test('1_000 -> 1,000', () => expect(formatNumber(1_000)).toBe('1,000'));
  });
});
