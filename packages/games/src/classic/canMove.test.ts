import { describe, expect, it } from 'vitest';
import { canMoveClassicGame } from './canMove';
import { createEmptyClassicGameField } from './createEmptyField';

describe('canMove - ClassicGame', () => {
  it('should return false on cell id out of range', () => {
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), -1)).toEqual(
      false
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 9)).toEqual(
      false
    );
  });

  it('should return false on cell id already taken', () => {
    expect(
      canMoveClassicGame(
        null,
        ['x', 'o', 'x', null, null, null, null, null, null],
        0
      )
    ).toEqual(false);

    expect(
      canMoveClassicGame(
        null,
        ['x', 'o', 'x', null, null, null, null, null, null],
        1
      )
    ).toEqual(false);

    expect(
      canMoveClassicGame(
        null,
        ['x', 'o', 'x', null, null, null, null, null, null],
        2
      )
    ).toEqual(false);
  });

  it('should return false on winner already set', () => {
    expect(canMoveClassicGame('x', createEmptyClassicGameField(), 0)).toEqual(
      false
    );
    expect(canMoveClassicGame('o', createEmptyClassicGameField(), 0)).toEqual(
      false
    );
    expect(
      canMoveClassicGame('draw', createEmptyClassicGameField(), 0)
    ).toEqual(false);
  });

  it('should return true on empty field', () => {
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 0)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 1)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 2)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 3)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 4)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 5)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 6)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 7)).toEqual(
      true
    );
    expect(canMoveClassicGame(null, createEmptyClassicGameField(), 8)).toEqual(
      true
    );
  });
});
