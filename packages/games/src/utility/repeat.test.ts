import { describe, expect, it } from 'vitest';
import { repeat } from './repeat';

describe('repeat', () => {
  const testTable: Record<
    string,
    { value: unknown; times: number; expected: unknown[] }[]
  > = {
    number: [
      {
        value: 1,
        times: 3,
        expected: [1, 1, 1],
      },
      {
        value: -100,
        times: 0,
        expected: [],
      },
      {
        value: 1241245,
        times: -1,
        expected: [],
      },
    ],
    null: [
      {
        value: null,
        times: 3,
        expected: [null, null, null],
      },
      {
        value: null,
        times: 0,
        expected: [],
      },
      {
        value: null,
        times: -1,
        expected: [],
      },
    ],
    undefined: [
      {
        value: undefined,
        times: 3,
        expected: [undefined, undefined, undefined],
      },
      {
        value: undefined,
        times: 0,
        expected: [],
      },
      {
        value: undefined,
        times: -1,
        expected: [],
      },
    ],
    string: [
      {
        value: 'a',
        times: 3,
        expected: ['a', 'a', 'a'],
      },
      {
        value: 'b',
        times: 0,
        expected: [],
      },
      {
        value: 'c',
        times: -1,
        expected: [],
      },
    ],
    array: [
      {
        value: [1, 2, 3],
        times: 3,
        expected: [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
      },
      {
        value: [1, 2, 3],
        times: 0,
        expected: [],
      },
      {
        value: [1, 2, 3],
        times: -1,
        expected: [],
      },
    ],
    object: [
      {
        value: { a: 1 },
        times: 3,
        expected: [{ a: 1 }, { a: 1 }, { a: 1 }],
      },
      {
        value: { b: 1 },
        times: 0,
        expected: [],
      },
      {
        value: { c: 1 },
        times: -1,
        expected: [],
      },
    ],
  };

  Object.entries(testTable).forEach(([name, tests]) => {
    it(name, () => {
      tests.forEach(({ value, times, expected }) => {
        try {
          expect(repeat(value, times)).toEqual(expected);
        } catch (e) {
          if (times >= 0) throw e;
          expect(e).toBeInstanceOf(RangeError);
        }
      });
    });
  });
});
