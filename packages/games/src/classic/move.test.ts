import { describe, expect, it } from 'vitest';
import { createEmptyClassicGameState } from './createEmptyGameState';
import { moveClassicGame } from './move';

describe('move - ClassicGame', () => {
  it('should return same state', () => {
    const state = createEmptyClassicGameState('x');
    expect(moveClassicGame(state, -1)).toEqual(state);
    expect(moveClassicGame(state, 10)).toEqual(state);
  });

  it('should return winner', () => {
    let state = createEmptyClassicGameState('x');
    state = moveClassicGame(state, 0);

    expect(state).toEqual({
      field: ['x', null, null, null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });
    state = moveClassicGame(state, 1);

    expect(state).toEqual({
      field: ['x', 'o', null, null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });
    state = moveClassicGame(state, 2);

    expect(state).toEqual({
      field: ['x', 'o', 'x', null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });
    state = moveClassicGame(state, 3);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });
    state = moveClassicGame(state, 4);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', 'x', null, null, null, null],
      userToMove: 'o',
      winner: null,
    });
    state = moveClassicGame(state, 5);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', 'x', 'o', null, null, null],
      userToMove: 'x',
      winner: null,
    });
    state = moveClassicGame(state, 6);

    expect(state).toEqual({
      field: ['x', 'o', 'x', 'o', 'x', 'o', 'x', null, null],
      userToMove: 'o',
      winner: 'x',
    });
  });

  it('should return new state by setting first x', () => {
    expect(moveClassicGame(createEmptyClassicGameState('x'), 0)).toEqual({
      field: ['x', null, null, null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 1)).toEqual({
      field: [null, 'x', null, null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 2)).toEqual({
      field: [null, null, 'x', null, null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 3)).toEqual({
      field: [null, null, null, 'x', null, null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 4)).toEqual({
      field: [null, null, null, null, 'x', null, null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 5)).toEqual({
      field: [null, null, null, null, null, 'x', null, null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 6)).toEqual({
      field: [null, null, null, null, null, null, 'x', null, null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 7)).toEqual({
      field: [null, null, null, null, null, null, null, 'x', null],
      userToMove: 'o',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('x'), 8)).toEqual({
      field: [null, null, null, null, null, null, null, null, 'x'],
      userToMove: 'o',
      winner: null,
    });
  });

  it('should return new state by setting first o', () => {
    expect(moveClassicGame(createEmptyClassicGameState('o'), 0)).toEqual({
      field: ['o', null, null, null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 1)).toEqual({
      field: [null, 'o', null, null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 2)).toEqual({
      field: [null, null, 'o', null, null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 3)).toEqual({
      field: [null, null, null, 'o', null, null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 4)).toEqual({
      field: [null, null, null, null, 'o', null, null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 5)).toEqual({
      field: [null, null, null, null, null, 'o', null, null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 6)).toEqual({
      field: [null, null, null, null, null, null, 'o', null, null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 7)).toEqual({
      field: [null, null, null, null, null, null, null, 'o', null],
      userToMove: 'x',
      winner: null,
    });

    expect(moveClassicGame(createEmptyClassicGameState('o'), 8)).toEqual({
      field: [null, null, null, null, null, null, null, null, 'o'],
      userToMove: 'x',
      winner: null,
    });
  });
});
