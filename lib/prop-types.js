const error = (message) => {
  console.warn(`[PropTypes] : ${message}`);
  throw new Error('An exception occurred during the rendering, see above for details');
};

const badType = (propName, expected, prop, component) => {
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
const badValue = (propName, expected, prop, component) => {
  error(`"expected "${propName}" in component "${component}" to be one of "${expected}" but is "${prop}"`);
};

Object.prototype.is = function (type) {
  if (type === 'array') return Array.isArray(this);
  if (type === 'null') return this === null;
  if (this === null && type === 'object') return false;
  if (Array.isArray(this) && type === 'object') return false;

  return typeof this === type;
};

export const checkPropTypes = (proptypes, props, { name: component }) => {
  Object.keys(props).forEach((propName) => {
    const validator = proptypes[propName];
    const prop = props[propName];

    if (typeof validator === 'undefined') {
      error(`variable "${propName}" of component "${component}" is missing props validation`);
      return;
    }

    if (validator.isRequired && props[propName] == null) {
      error(`missing value for required prop "${propName}" of component "${component}"`);
    }

    const { type: validatorType } = validator;

    switch (validatorType) {
      case 'array':
        if (!prop?.is(validatorType)) {
          badType(propName, validatorType, prop, component);
        }
        break;

      case 'object':
        if (!prop?.is(validatorType)) {
          badType(propName, validatorType, prop, component);
        }
        break;

      case 'null':
        if (prop !== null) {
          badType(propName, validatorType, prop, component);
        }
        break;

      case 'enum':
      {
        const { values } = validator;

        if (
          !values.is('array')
            || !values.every((value) => value.is('string') || value.is('number'))
        ) {
          error(`expected enum values of prop "${propName}" of component "${component}" to be of type "<${['string', 'number'].join('|')}>"`);
        }

        if (!values.some((v) => v === prop)) {
          const expectedValues = `[${values.join('|')}]`;
          badValue(propName, expectedValues, prop, component);
        }

        break;
      }

      default:
        if (!prop?.is(validatorType)) {
          badType(propName, validatorType, prop, component);
        }
    }
  });
};

export const cleanProptypes = (proptypes) => {
  Object.keys(proptypes).forEach((p) => {
    if (typeof proptypes[p] === 'undefined') {
      error(`proptype for prop "${p}" does not exist`);
    }

    const { type, values, isRequired = false } = proptypes[p];
    proptypes[p] = { type, values, isRequired };
  });

  return proptypes;
};

const getValidator = (type, values, required) => ({
  type,
  values,
  isRequired: required || getValidator(type, null, true),
});

export default {
  any: getValidator('any'),
  array: getValidator('array'),
  boolean: getValidator('boolean'),
  function: getValidator('function'),
  number: getValidator('number'),
  object: getValidator('object'),
  string: getValidator('string'),
  null: getValidator('null'),
  enum: (values) => getValidator('enum', values),
};
