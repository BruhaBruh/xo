import { describe, expect, it } from 'vitest';
import { canMove } from './canMove';
import { createEmptyField } from './createEmptyField';

describe('canMove - ClassicGame', () => {
  it('should return false on cell id out of range', () => {
    expect(canMove(null, createEmptyField(), -1)).toEqual(false);
    expect(canMove(null, createEmptyField(), 9)).toEqual(false);
  });

  it('should return false on cell id already taken', () => {
    expect(
      canMove(null, ['x', 'o', 'x', null, null, null, null, null, null], 0)
    ).toEqual(false);

    expect(
      canMove(null, ['x', 'o', 'x', null, null, null, null, null, null], 1)
    ).toEqual(false);

    expect(
      canMove(null, ['x', 'o', 'x', null, null, null, null, null, null], 2)
    ).toEqual(false);
  });

  it('should return false on winner already set', () => {
    expect(canMove('x', createEmptyField(), 0)).toEqual(false);
    expect(canMove('o', createEmptyField(), 0)).toEqual(false);
    expect(canMove('draw', createEmptyField(), 0)).toEqual(false);
  });

  it('should return true on empty field', () => {
    expect(canMove(null, createEmptyField(), 0)).toEqual(true);
    expect(canMove(null, createEmptyField(), 1)).toEqual(true);
    expect(canMove(null, createEmptyField(), 2)).toEqual(true);
    expect(canMove(null, createEmptyField(), 3)).toEqual(true);
    expect(canMove(null, createEmptyField(), 4)).toEqual(true);
    expect(canMove(null, createEmptyField(), 5)).toEqual(true);
    expect(canMove(null, createEmptyField(), 6)).toEqual(true);
    expect(canMove(null, createEmptyField(), 7)).toEqual(true);
    expect(canMove(null, createEmptyField(), 8)).toEqual(true);
  });
});
