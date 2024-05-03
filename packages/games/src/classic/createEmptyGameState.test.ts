import { describe, expect, it } from 'vitest';
import { createEmptyClassicGameField } from './createEmptyField';
import { createEmptyClassicGameState } from './createEmptyGameState';

describe('createEmptyGameState - ClassicGame', () => {
  it('should create winner equals null', () => {
    const game = createEmptyClassicGameState();

    expect(game.winner).toEqual(null);
  });

  it('should create empty game field', () => {
    const game = createEmptyClassicGameState();

    expect(game.field).toEqual(createEmptyClassicGameField());
  });

  it('should create user to move equals x', () => {
    for (let i = 0; i < 10; i += 1) {
      const game = createEmptyClassicGameState('x');

      expect(game.userToMove).toBe('x');
    }
  });

  it('should create user to move equals o', () => {
    for (let i = 0; i < 10; i += 1) {
      const game = createEmptyClassicGameState('o');

      expect(game.userToMove).toBe('o');
    }
  });
});
