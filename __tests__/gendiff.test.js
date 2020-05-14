import fs from 'fs';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src';

describe('Testing JSON files', () => {
  test('Testing flat JSON files', () => {
    const flatJSONPathBefore = `${__dirname}/__fixtures__/json/before-flat.json`;
    const flatJSONPathAfter = `${__dirname}/__fixtures__/json/after-flat.json`;
    const expectedFlatJson = fs.readFileSync(`${__dirname}/__fixtures__/json/result-flat`, 'utf-8');
    expect(genDiff(flatJSONPathBefore, flatJSONPathAfter)).toBe(expectedFlatJson);
  });

  test('Testing deep JSON files', () => {
    const deepJSONPathBefore = `${__dirname}/__fixtures__/json/before-deep.json`;
    const deepJSONPathAfter = `${__dirname}/__fixtures__/json/after-deep.json`;
    const expectedDeepJson = fs.readFileSync(`${__dirname}/__fixtures__/json/result-deep`, 'utf-8');
    expect(genDiff(deepJSONPathBefore, deepJSONPathAfter, 'tree')).toEqual(expectedDeepJson);
  });

  test('Testing plain JSON files', () => {
    const deepIniPathBefore = `${__dirname}/__fixtures__/json/before-flat.json`;
    const deepIniPathAfter = `${__dirname}/__fixtures__/json/after-flat.json`;
    const expectedPlainIni = fs.readFileSync(`${__dirname}/__fixtures__/json/result-plain`, 'utf-8');
    expect(genDiff(deepIniPathBefore, deepIniPathAfter, 'plain')).toEqual(expectedPlainIni);
  });
});

describe('Testing YAML files', () => {
  test('Testing flat YAML files', () => {
    const flatYamlPathBefore = `${__dirname}/__fixtures__/yaml/before-flat.yaml`;
    const flatYamlPathAfter = `${__dirname}/__fixtures__/yaml/after-flat.yaml`;
    const expectedFlatYaml = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-flat`, 'utf-8');
    expect(genDiff(flatYamlPathBefore, flatYamlPathAfter)).toEqual(expectedFlatYaml);
  });

  test('Testing deep YAML files', () => {
    const deepYamlPathBefore = `${__dirname}/__fixtures__/yaml/before-deep.yaml`;
    const deepYamlPathAfter = `${__dirname}/__fixtures__/yaml/after-deep.yaml`;
    const expectedDeepYaml = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-deep`, 'utf-8');
    expect(genDiff(deepYamlPathBefore, deepYamlPathAfter, 'tree')).toEqual(expectedDeepYaml);
  });

  test('Testing plain YAML files', () => {
    const deepYamlPathBefore = `${__dirname}/__fixtures__/yaml/before-flat.yaml`;
    const deepYamlPathAfter = `${__dirname}/__fixtures__/yaml/after-flat.yaml`;
    const expectedPlainYaml = fs.readFileSync(`${__dirname}/__fixtures__/yaml/result-plain`, 'utf-8');
    expect(genDiff(deepYamlPathBefore, deepYamlPathAfter, 'plain')).toEqual(expectedPlainYaml);
  });
});

describe('Testing INI files', () => {
  test('Testing flat INI files', () => {
    const flatIniPathBefore = `${__dirname}/__fixtures__/ini/before-flat.ini`;
    const flatIniPathAfter = `${__dirname}/__fixtures__/ini/after-flat.ini`;
    const expectedFlatIni = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-flat`, 'utf-8');
    expect(genDiff(flatIniPathBefore, flatIniPathAfter)).toEqual(expectedFlatIni);
  });

  test('Testing deep INI files', () => {
    const deepIniPathBefore = `${__dirname}/__fixtures__/ini/before-flat.ini`;
    const deepIniPathAfter = `${__dirname}/__fixtures__/ini/after-flat.ini`;
    const expectedDeepIni = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-flat`, 'utf-8');
    expect(genDiff(deepIniPathBefore, deepIniPathAfter, 'tree')).toEqual(expectedDeepIni);
  });

  test('Testing plain INI files', () => {
    const flatIniPathBefore = `${__dirname}/__fixtures__/ini/before-flat.ini`;
    const flatIniPathAfter = `${__dirname}/__fixtures__/ini/after-flat.ini`;
    const expectedPlainJson = fs.readFileSync(`${__dirname}/__fixtures__/ini/result-plain`, 'utf-8');
    expect(genDiff(flatIniPathBefore, flatIniPathAfter, 'plain')).toEqual(expectedPlainJson);
  });
});
