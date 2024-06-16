import { cn } from './index'
import { expect, describe, test } from 'vitest'

describe('cn', () => {
  test('empty', () => {
    expect(cn()).toBe('');
  });
  test('only string', () => {
    expect(cn('class')).toBe('class');
  });
  test('with true statement', () => {
    expect(cn('class', { class2: true })).toBe('class class2');
  });
  test('with false and true statement', () => {
    expect(cn('class', { class2: false, class3: true })).toBe('class class3');
  });
});

