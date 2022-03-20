const error = (message) => {
  console.error(`[PropTypes] : ${message}`);
  throw new Error('An exception occurred during the rendering, see above for details');
};

const warnBadType = (propName, expected, prop, component) => {
  let received;

  if (prop === null) {
    received = 'null';
  } else if (prop === undefined) {
    received = 'undefined';
  } else if (Array.isArray(prop)) {
    received = 'array';
  } else {
    received = typeof prop;
  }

  error(`"${propName}" in component "${component}" was marked as "${expected}" but is "${received}"`);
};

export const checkPropTypes = (proptypes, props, { name: component }) => {
  for (const propName in props) {
    const validator = proptypes[propName];
    const prop = props[propName];

    if (typeof validator === 'undefined') {
      error(`variable "${propName}" of component "${component}" is missing props validation`);
      continue;
    }

    if (validator.isRequired && props[propName] == null) {
      error(`missing value for required prop "${propName}" of component "${component}"`);
    }

    const { type: validatorType } = validator;

    if (validatorType === 'any') continue;

    if (validatorType === 'array') {
      if (!Array.isArray(prop)) {
        warnBadType(propName, validatorType, prop, component);
      }
      continue;
    }

    if (validatorType === null && validatorType === 'object') {
      warnBadType(propName, validatorType, prop, component);
      continue;
    }
    if (Array.isArray(prop) && validatorType === 'object') {
      warnBadType(propName, validatorType, prop, component);
      continue;
    }
    if (typeof prop !== validatorType) {
      warnBadType(propName, validatorType, prop, component);
    }
  }
};

export const cleanProptypes = (proptypes) => {
  for (const p in proptypes) {
    if (typeof proptypes[p] === 'undefined') {
      error(`proptype for prop "${p}" does not exist`);
    }

    proptypes[p] = {
      type: proptypes[p].type,
      isRequired: proptypes[p].isRequired === true,
    };
  }

  return proptypes;
};

const getValidator = (type, required) => ({
  type,
  isRequired: required || getValidator(type, true),
});

export default {
  any: getValidator('any'),
  array: getValidator('array'),
  bool: getValidator('boolean'),
  func: getValidator('function'),
  number: getValidator('number'),
  object: getValidator('object'),
  string: getValidator('string'),
};
