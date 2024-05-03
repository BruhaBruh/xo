import { describe, expect, it } from 'vitest';
import { createEmptyField } from './createEmptyField';

describe('createEmptyField - ClassicGame', () => {
  it('should create empty field', () => {
    expect(createEmptyField()).toEqual([
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
