import { describe, expect, it } from 'vitest';
import { createEmptyClassicGameField } from './createEmptyField';

describe('createEmptyField - ClassicGame', () => {
  it('should create empty field', () => {
    expect(createEmptyClassicGameField()).toEqual([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
  });
});
