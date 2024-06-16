import { currency } from './index';
import { expect, describe, test } from 'vitest'

describe('Currency', async () => {
  const gotRes = await currency.get()
  test('Got res', () => {
    expect(Boolean(gotRes)).toBe(true);
  });
});