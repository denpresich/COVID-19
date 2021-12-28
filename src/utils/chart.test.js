/* eslint-disable no-undef */
import { getDotNumber, shouldShowDot } from './chart';

describe('Utils - chart', () => {
  describe('getDotNumber', () => {
    test('getDotNumber - dot-1, return 1', () => {
      const data = 'dot-1';
      const expectedResult = '1';
      const actualResult = getDotNumber(data);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('getDotNumber - dot-21, return 1', () => {
      const data = 'dot-21';
      const expectedResult = '21';
      const actualResult = getDotNumber(data);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('getDotNumber - dot-875, return 1', () => {
      const data = 'dot-875';
      const expectedResult = '875';
      const actualResult = getDotNumber(data);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('getDotNumber - dot-, return ""', () => {
      const data = 'dot-';
      const expectedResult = '';
      const actualResult = getDotNumber(data);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('getDotNumber - dot, return undefined', () => {
      const data = 'dot';
      const expectedResult = undefined;
      const actualResult = getDotNumber(data);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('getDotNumber - dot_1, return undefined', () => {
      const data = 'dot_1';
      const expectedResult = undefined;
      const actualResult = getDotNumber(data);

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('shouldShowDot', () => {
    test('points count < 30, return true', () => {
      const pointNumber = 1;
      const pointsCount = 29;
      const gap = 1;

      const expectedResult = true;

      const actualResult = shouldShowDot(pointNumber, pointsCount, gap);

      expect(actualResult).toBe(expectedResult);
    });
    test('points count > 30, gap = 4, pointNumber = 8, return true', () => {
      const pointNumber = 8;
      const pointsCount = 32;
      const gap = 4;

      const expectedResult = true;

      const actualResult = shouldShowDot(pointNumber, pointsCount, gap);

      expect(actualResult).toBe(expectedResult);
    });
    test('points count > 30, gap = 4, pointNumber = 9, return false', () => {
      const pointNumber = 9;
      const pointsCount = 32;
      const gap = 4;

      const expectedResult = false;

      const actualResult = shouldShowDot(pointNumber, pointsCount, gap);

      expect(actualResult).toBe(expectedResult);
    });
    test('points count > 30, gap = 7, pointNumber = 28, return true', () => {
      const pointNumber = 28;
      const pointsCount = 32;
      const gap = 7;

      const expectedResult = true;

      const actualResult = shouldShowDot(pointNumber, pointsCount, gap);

      expect(actualResult).toBe(expectedResult);
    });
    test('points count > 30, gap = 7, pointNumber = 32, return false', () => {
      const pointNumber = 32;
      const pointsCount = 32;
      const gap = 7;

      const expectedResult = false;

      const actualResult = shouldShowDot(pointNumber, pointsCount, gap);

      expect(actualResult).toBe(expectedResult);
    });
    test('points count > 30, gap = 7, pointNumber = 0, return true', () => {
      const pointNumber = 0;
      const pointsCount = 32;
      const gap = 7;

      const expectedResult = true;

      const actualResult = shouldShowDot(pointNumber, pointsCount, gap);

      expect(actualResult).toBe(expectedResult);
    });
  });
});
