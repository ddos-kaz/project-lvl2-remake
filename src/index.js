import fs from 'fs';
import lodash from 'lodash';

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

  const beforeFileData = JSON.parse(beforeFile);
  const afterFileData = JSON.parse(afterFile);
  const allKeys = lodash.union(Object.keys(beforeFileData), Object.keys(afterFileData));

  const parsedData = parse(beforeFileData, afterFileData, allKeys);
  console.log(`{\n${render(parsedData)}\n}`);
  return `{\n${render(parsedData)}\n}`;
};
