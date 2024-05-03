import { describe, expect, it } from 'vitest';
import { createEmptyField } from './createEmptyField';
import { getWinner } from './getWinner';

describe('getWinner - ClassicGame', () => {
  it('should return null', () => {
    expect(getWinner(createEmptyField())).toEqual(null);
  });

  it('should return x', () => {
    expect(
      getWinner(['x', 'x', 'x', null, null, null, null, null, null])
    ).toEqual('x');

    expect(
      getWinner([null, null, null, 'x', 'x', 'x', null, null, null])
    ).toEqual('x');

    expect(
      getWinner([null, null, null, null, null, null, 'x', 'x', 'x'])
    ).toEqual('x');

    expect(
      getWinner(['x', null, null, 'x', null, null, 'x', null, null])
    ).toEqual('x');

    expect(
      getWinner([null, 'x', null, null, 'x', null, null, 'x', null])
    ).toEqual('x');

    expect(
      getWinner([null, null, 'x', null, null, 'x', null, null, 'x'])
    ).toEqual('x');

    expect(
      getWinner(['x', null, null, null, 'x', null, null, null, 'x'])
    ).toEqual('x');

    expect(
      getWinner([null, null, 'x', null, 'x', null, 'x', null, null])
    ).toEqual('x');
  });

  it('should return o', () => {
    expect(
      getWinner(['o', 'o', 'o', null, null, null, null, null, null])
    ).toEqual('o');

    expect(
      getWinner([null, null, null, 'o', 'o', 'o', null, null, null])
    ).toEqual('o');

    expect(
      getWinner([null, null, null, null, null, null, 'o', 'o', 'o'])
    ).toEqual('o');

    expect(
      getWinner(['o', null, null, 'o', null, null, 'o', null, null])
    ).toEqual('o');

    expect(
      getWinner([null, 'o', null, null, 'o', null, null, 'o', null])
    ).toEqual('o');

    expect(
      getWinner([null, null, 'o', null, null, 'o', null, null, 'o'])
    ).toEqual('o');

    expect(
      getWinner(['o', null, null, null, 'o', null, null, null, 'o'])
    ).toEqual('o');

    expect(
      getWinner([null, null, 'o', null, 'o', null, 'o', null, null])
    ).toEqual('o');
  });

  it('should return draw', () => {
    expect(getWinner(['x', 'x', 'o', 'o', 'o', 'x', 'x', 'o', 'x'])).toEqual(
      'draw'
    );

    expect(getWinner(['x', 'o', 'o', 'o', 'x', 'x', 'x', 'x', 'o'])).toEqual(
      'draw'
    );

    expect(getWinner(['x', 'x', 'o', 'o', 'o', 'x', 'x', 'x', 'o'])).toEqual(
      'draw'
    );
  });
});
