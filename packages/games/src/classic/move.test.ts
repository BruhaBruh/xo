import { describe, expect, it } from 'vitest';
import { createEmptyClassicGameState } from './createEmptyGameState';
import { move } from './move';

describe('move - ClassicGame', () => {
  it('should return same state', () => {
    const state = createEmptyClassicGameState('x');
    expect(move(state, -1)).toEqual(state);
    expect(move(state, 10)).toEqual(state);
  });

  it('should return winner', () => {
    let state = createEmptyClassicGameState('x');
    state = move(state, 0);

    expect(state).toEqual({
      field: ['x', null, null, null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });
    state = move(state, 1);

    expect(state).toEqual({
      field: ['x', 'o', null, null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });
    state = move(state, 2);

    expect(state).toEqual({
      field: ['x', 'o', 'x', null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });
    state = move(state, 3);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });
    state = move(state, 4);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', 'x', null, null, null, null],
      userToMove: 'o',
      winner: null,
    });
    state = move(state, 5);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', 'x', 'o', null, null, null],
      userToMove: 'x',
      winner: null,
    });
    state = move(state, 6);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', 'x', 'o', 'x', null, null],
      userToMove: 'o',
      winner: 'x',
    });
  });

  it('should return new state by setting first x', () => {
    expect(move(createEmptyClassicGameState('x'), 0)).toEqual({
      field: ['x', null, null, null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 1)).toEqual({
      field: [null, 'x', null, null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 2)).toEqual({
      field: [null, null, 'x', null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 3)).toEqual({
      field: [null, null, null, 'x', null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 4)).toEqual({
      field: [null, null, null, null, 'x', null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 5)).toEqual({
      field: [null, null, null, null, null, 'x', null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 6)).toEqual({
      field: [null, null, null, null, null, null, 'x', null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 7)).toEqual({
      field: [null, null, null, null, null, null, null, 'x', null],
      userToMove: 'o',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('x'), 8)).toEqual({
      field: [null, null, null, null, null, null, null, null, 'x'],
      userToMove: 'o',
      winner: null,
    });
  });

  it('should return new state by setting first o', () => {
    expect(move(createEmptyClassicGameState('o'), 0)).toEqual({
      field: ['o', null, null, null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 1)).toEqual({
      field: [null, 'o', null, null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 2)).toEqual({
      field: [null, null, 'o', null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 3)).toEqual({
      field: [null, null, null, 'o', null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 4)).toEqual({
      field: [null, null, null, null, 'o', null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 5)).toEqual({
      field: [null, null, null, null, null, 'o', null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 6)).toEqual({
      field: [null, null, null, null, null, null, 'o', null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 7)).toEqual({
      field: [null, null, null, null, null, null, null, 'o', null],
      userToMove: 'x',
      winner: null,
    });

    expect(move(createEmptyClassicGameState('o'), 8)).toEqual({
      field: [null, null, null, null, null, null, null, null, 'o'],
      userToMove: 'x',
      winner: null,
    });
  });
});
