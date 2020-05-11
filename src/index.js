import fs from 'fs';
import path from 'path';
import lodash from 'lodash';
import generateObj from './parsers';

const parse = (beforeObj, afterObj, keys) => keys.reduce((acc, key) => {
  const resultObj = {
    name: key,
    value: afterObj[key],
    sign: '\t  ',
  };

  if (lodash.has(beforeObj, key) && lodash.has(afterObj, key) && beforeObj[key] !== afterObj[key]) {
    return [...acc, lodash.assign(resultObj, { sign: '\t+ ' }), lodash.assign({}, resultObj, { value: beforeObj[key], sign: '\t- ' })];
  }

  if (!lodash.has(beforeObj, key) && lodash.has(afterObj, key)) {
    return [...acc, lodash.assign(resultObj, { sign: '\t+ ' })];
  }

  if (lodash.has(beforeObj, key) && !lodash.has(afterObj, key)) {
    return [...acc, lodash.assign(resultObj, { sign: '\t- ', value: beforeObj[key] })];
  }

  return [...acc, resultObj];
}, []);

const render = (data) => data.map((item) => `${item.sign}${item.name}: ${item.value}`).join('\n');

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = fs.readFileSync(beforeFilePath, 'utf-8');
  const afterFile = fs.readFileSync(afterFilePath, 'utf-8');
  const beforeFileExt = path.extname(beforeFilePath);
  const afterFileExt = path.extname(afterFilePath);

  const beforeFileData = generateObj(beforeFileExt)(beforeFile);
  const afterFileData = generateObj(afterFileExt)(afterFile);
  const allKeys = lodash.union(Object.keys(beforeFileData), Object.keys(afterFileData));

  const parsedData = parse(beforeFileData, afterFileData, allKeys);
  return `{\n${render(parsedData)}\n}`;
};
