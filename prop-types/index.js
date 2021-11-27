export const checkPropType = (variable, type) => {
  if (type === 'any') return true;
  if (type === 'array') return Array.isArray(variable);
  if (variable === null && type === 'object') return false;
  if (Array.isArray(variable) && type === 'object') return false;

  return typeof variable === type;
};

export default {
  any: 'any',
  array: 'array',
  bool: 'boolean',
  func: 'function',
  number: 'number',
  object: 'object',
  string: 'string',
};
