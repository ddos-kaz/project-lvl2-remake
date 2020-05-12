import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import generateObj from './parsers';

const generateAst = (key, beforeValue, afterValue) => {
  const resultObj = {
    name: key,
    type: '',
    valueBefore: beforeValue,
    valueAfter: afterValue,
    children: null,
  };

  if (lodash.isObject(beforeValue) && lodash.isObject(afterValue)) {
    const valKeys = lodash.union(Object.keys(beforeValue), Object.keys(afterValue));

    return {
      name: key,
      type: 'object',
      valueBefore: null,
      afterValue: null,
      children:
        valKeys
          .sort().map((valKey) => generateAst(valKey, beforeValue[valKey], afterValue[valKey])),
    };
  }

  if (beforeValue === undefined) {
    return { ...resultObj, type: 'added', valueBefore: null };
  }

  if (afterValue === undefined) {
    return { ...resultObj, type: 'removed', valueAfter: null };
  }

  if (afterValue === beforeValue) {
    return { ...resultObj, type: 'similar' };
  }

  return { ...resultObj, type: 'modified' };
};

const buildAst = (beforeObj, afterObj) => {
  const keys = lodash.union(Object.keys(beforeObj), Object.keys(afterObj));

  return keys.sort().map((key) => generateAst(key, beforeObj[key], afterObj[key]));
};

const parseValue = (value, level) => {
  const space = '  ';
  if (lodash.isObject(value)) {
    const valueKeys = Object.keys(value);
    const valuesCollection = valueKeys.map((key) => `${space.repeat(level + 2)}${key}: ${value[key]}`).join('\n');
    return `{\n${valuesCollection}\n${space.repeat(level)}}`;
  }

  return value;
};

const buildLine = (obj, level) => {
  const space = '  ';
  const added = '+ ';
  const removed = '- ';

  const {
    name,
    type,
    valueBefore,
    valueAfter,
    children,
  } = obj;

  switch (type) {
    case 'object':
      return `${space.repeat(level + 1)}${name}: {\n${children.map((child) => buildLine(child, level + 2)).join('\n')}\n${space.repeat(level + 1)}}`;
    case 'added':
      return `${space.repeat(level)}${added}${name}: ${parseValue(valueAfter, level + 1)}`;
    case 'removed':
      return `${space.repeat(level)}${removed}${name}: ${parseValue(valueBefore, level + 1)}`;
    case 'modified':
      return `${space.repeat(level)}${added}${name}: ${parseValue(valueAfter, level + 1)}\n${space.repeat(level)}${removed}${name}: ${parseValue(valueBefore, level + 1)}`;
    default:
      return `${space.repeat(level + 1)}${name}: ${parseValue(valueAfter, level + 1)}`;
  }
};

const parseAst = (ast, level = 0) => ast
  .map((obj) => buildLine(obj, level + 1)).join('\n');

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = fs.readFileSync(beforeFilePath, 'utf-8');
  const afterFile = fs.readFileSync(afterFilePath, 'utf-8');
  const beforeFileExt = path.extname(beforeFilePath);
  const afterFileExt = path.extname(afterFilePath);

  const beforeFileData = generateObj(beforeFileExt)(beforeFile);
  const afterFileData = generateObj(afterFileExt)(afterFile);

  const ast = buildAst(beforeFileData, afterFileData);

  return `{\n${parseAst(ast)}\n}`;
};
