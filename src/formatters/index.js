import lodash from 'lodash';
import jsonFN from './json';
import treeFN from './tree';
import plainFN from './plain';

const formatterFN = {
  json: jsonFN,
  tree: treeFN,
  plain: plainFN,
};

export default (format, ast) => {
  if (!lodash.has(formatterFN, format)) {
    return 'There is no such format';
  }
  return formatterFN[format](ast);
};
