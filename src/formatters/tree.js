import lodash from 'lodash';

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

export default (ast) => `{\n${parseAst(ast)}\n}`;
