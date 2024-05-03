import { describe, expect, it } from 'vitest';
import { createEmptyClassicGameField } from './createEmptyField';
import { getClassicGameWinner } from './getWinner';

describe('getWinner - ClassicGame', () => {
  it('should return null', () => {
    expect(getClassicGameWinner(createEmptyClassicGameField())).toEqual(null);
  });

  it('should return x', () => {
    expect(
      getClassicGameWinner(['x', 'x', 'x', null, null, null, null, null, null])
    ).toEqual('x');

    expect(
      getClassicGameWinner([null, null, null, 'x', 'x', 'x', null, null, null])
    ).toEqual('x');

    expect(
      getClassicGameWinner([null, null, null, null, null, null, 'x', 'x', 'x'])
    ).toEqual('x');

    expect(
      getClassicGameWinner(['x', null, null, 'x', null, null, 'x', null, null])
    ).toEqual('x');

    expect(
      getClassicGameWinner([null, 'x', null, null, 'x', null, null, 'x', null])
    ).toEqual('x');

    expect(
      getClassicGameWinner([null, null, 'x', null, null, 'x', null, null, 'x'])
    ).toEqual('x');

    expect(
      getClassicGameWinner(['x', null, null, null, 'x', null, null, null, 'x'])
    ).toEqual('x');

    expect(
      getClassicGameWinner([null, null, 'x', null, 'x', null, 'x', null, null])
    ).toEqual('x');
  });

  it('should return o', () => {
    expect(
      getClassicGameWinner(['o', 'o', 'o', null, null, null, null, null, null])
    ).toEqual('o');

    expect(
      getClassicGameWinner([null, null, null, 'o', 'o', 'o', null, null, null])
    ).toEqual('o');

    expect(
      getClassicGameWinner([null, null, null, null, null, null, 'o', 'o', 'o'])
    ).toEqual('o');

    expect(
      getClassicGameWinner(['o', null, null, 'o', null, null, 'o', null, null])
    ).toEqual('o');

    expect(
      getClassicGameWinner([null, 'o', null, null, 'o', null, null, 'o', null])
    ).toEqual('o');

    expect(
      getClassicGameWinner([null, null, 'o', null, null, 'o', null, null, 'o'])
    ).toEqual('o');

    expect(
      getClassicGameWinner(['o', null, null, null, 'o', null, null, null, 'o'])
    ).toEqual('o');

    expect(
      getClassicGameWinner([null, null, 'o', null, 'o', null, 'o', null, null])
    ).toEqual('o');
  });

  it('should return draw', () => {
    expect(
      getClassicGameWinner(['x', 'x', 'o', 'o', 'o', 'x', 'x', 'o', 'x'])
    ).toEqual('draw');

    expect(
      getClassicGameWinner(['x', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'o'])
    ).toEqual('draw');

    expect(
      getClassicGameWinner(['x', 'x', 'o', 'o', 'o', 'x', 'x', 'x', 'o'])
    ).toEqual('draw');
  });
});
