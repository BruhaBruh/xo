import { describe, expect, it } from 'vitest';
import { randomId } from '.';

describe('randomId', () => {
  it('should return string with length equals to 12', () => {
    expect(randomId()).toHaveLength(12);
  });
});
