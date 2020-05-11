import fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src';

describe('Testing JSON files', () => {
  test('initial testing', () => {
    const pathBefore = `${__dirname}/__fixtures__/json/before.json`;
    const pathAfter = `${__dirname}/__fixtures__/json/after.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/json/result`, 'utf-8');
    expect(genDiff(pathBefore, pathAfter)).toBe(expected.slice(0, -1));
  });
});
