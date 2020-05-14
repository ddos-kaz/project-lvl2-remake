import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import generateObj from './parsers';
import formmater from './formatters';

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

export default (beforeFilePath, afterFilePath, format = 'tree') => {
  const beforeFile = fs.readFileSync(beforeFilePath, 'utf-8');
  const afterFile = fs.readFileSync(afterFilePath, 'utf-8');
  const beforeFileExt = path.extname(beforeFilePath);
  const afterFileExt = path.extname(afterFilePath);

  const beforeFileData = generateObj(beforeFileExt)(beforeFile);
  const afterFileData = generateObj(afterFileExt)(afterFile);

  const ast = buildAst(beforeFileData, afterFileData);

  return formmater(format, ast);
};
