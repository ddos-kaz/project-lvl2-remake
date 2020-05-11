import fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src';

describe('Testing JSON files', () => {
  test('Testing flat JSON files', () => {
    const flatJSONPathBefore = `${__dirname}/__fixtures__/json/before.json`;
    const flatJSONPathAfter = `${__dirname}/__fixtures__/json/after.json`;
    const expected = fs.readFileSync(`${__dirname}/__fixtures__/json/result`, 'utf-8');
    expect(genDiff(flatJSONPathBefore, flatJSONPathAfter)).toBe(expected.slice(0, -1));
  });
});

describe('Testing YAML files', () => {
  test('Testing flat YAML files', () => {
    const flatYamlPathBefore = `${__dirname}/__fixtures__/yaml/before.yaml`;
    const flatYamlPathAfter = `${__dirname}/__fixtures__/yaml/after.yaml`;
    const expectedFlatYaml = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-flat`, 'utf-8');
    expect(genDiff(flatYamlPathBefore, flatYamlPathAfter)).toEqual(expectedFlatYaml.slice(0, -1));
  });
});

describe('Testing INI files', () => {
  test('Testing flat INI files', () => {
    const flatIniPathBefore = `${__dirname}/__fixtures__/ini/before-flat.ini`;
    const flatIniPathAfter = `${__dirname}/__fixtures__/ini/after-flat.ini`;
    const expectedFlatIni = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-flat`, 'utf-8');
    expect(genDiff(flatIniPathBefore, flatIniPathAfter)).toEqual(expectedFlatIni.slice(0, -1));
  });
});
