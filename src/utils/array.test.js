/* eslint-disable no-undef */
import { keyBy, sort } from './array';

describe('Utils - array', () => {
  describe('keyBy', () => {
    test('Map values by key (country) - 1', () => {
      const values = [
        { country: 'Ukraine', population: 1 },
        { country: 'USA', population: 2 },
        { country: 'Canada', population: 3 },
        { country: 'Germany', population: 2 },
        { country: 'France', population: 4 },
        { country: 'Englang', population: 1 },
      ];

      const expectedResult = {
        Ukraine: { country: 'Ukraine', population: 1 },
        USA: { country: 'USA', population: 2 },
        Canada: { country: 'Canada', population: 3 },
        Germany: { country: 'Germany', population: 2 },
        France: { country: 'France', population: 4 },
        Englang: { country: 'Englang', population: 1 },
      };

      const actualResult = keyBy(values, 'country');

      expect(actualResult).toStrictEqual(expectedResult);
    });

    test('Empty array - return empty object', () => {
      const expectedResult = {};

      const actualResult = keyBy([], 'country');

      expect(actualResult).toStrictEqual(expectedResult);
    });

    test('Key does not exist - return object with last value under key "undefined"', () => {
      const data = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }];

      const expectedResult = { undefined: { a: 5 } };

      const actualResult = keyBy(data, 'b');

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('sort', () => {
    test('sort number asc', () => {
      const data = [3, 2, 5, 1, 4];
      const sortState = { key: null, direction: 'asc' };

      const expectedResult = [1, 2, 3, 4, 5];
      const actualResult = sort(data, sortState);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('sort number desc', () => {
      const data = [3, 2, 5, 1, 4];
      const sortState = { key: null, direction: 'desc' };

      const expectedResult = [5, 4, 3, 2, 1];
      const actualResult = sort(data, sortState);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('sort char asc', () => {
      const data = ['c', 'b', 'e', 'a', 'd'];
      const sortState = { key: null, direction: 'asc' };

      const expectedResult = ['a', 'b', 'c', 'd', 'e'];
      const actualResult = sort(data, sortState);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('sort char desc', () => {
      const data = ['c', 'b', 'e', 'a', 'd'];
      const sortState = { key: null, direction: 'desc' };

      const expectedResult = ['e', 'd', 'c', 'b', 'a'];
      const actualResult = sort(data, sortState);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('sort char (with Upper-case) asc', () => {
      const data = ['c', 'B', 'e', 'a', 'D'];
      const sortState = { key: null, direction: 'asc' };

      const expectedResult = ['B', 'D', 'a', 'c', 'e'];
      const actualResult = sort(data, sortState);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('sort numbers by key asc', () => {
      const data = [{ a: 3 }, { a: 2 }, { a: 5 }, { a: 1 }, { a: 4 }];
      const sortState = { key: 'a', direction: 'asc' };

      const expectedResult = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }];
      const actualResult = sort(data, sortState);

      expect(actualResult).toStrictEqual(expectedResult);
    });
    test('sort numbers by key desc', () => {
      const data = [{ a: 3 }, { a: 2 }, { a: 5 }, { a: 1 }, { a: 4 }];
      const sortState = { key: 'a', direction: 'desc' };

      const expectedResult = [{ a: 5 }, { a: 4 }, { a: 3 }, { a: 2 }, { a: 1 }];
      const actualResult = sort(data, sortState);

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});
