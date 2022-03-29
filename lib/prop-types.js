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

export const cleanProptypes = (proptypes) => {
  Object.keys(proptypes).forEach((p) => {
    const prop = proptypes[p];

    if (typeof prop === 'undefined') {
      error(`proptype for prop "${p}" does not exist`);
    }

    if (typeof prop.isRequired === 'object') {
      prop.isRequired = false;
    }
  });

  return proptypes;
};

export const checkPropTypes = (proptypes, props, component) => {
  const componentName = component.name;
  proptypes = cleanProptypes(proptypes);

  Object.keys(props).forEach((propName) => {
    const validator = proptypes[propName];
    const prop = props[propName];

    if (typeof validator === 'undefined') {
      error(`variable "${propName}" of component "${componentName}" is missing props validation`);
      return;
    }

    if (validator.isRequired && props[propName] == null) {
      error(`missing value for required prop "${propName}" of component "${componentName}"`);
    }

    const { type: validatorType } = validator;

    switch (validatorType) {
      case 'array':
        if (!prop?.is(validatorType)) {
          badType(propName, validatorType, prop, componentName);
        }
        break;

      case 'object':
        if (!prop?.is(validatorType)) {
          badType(propName, validatorType, prop, componentName);
        }
        break;

      case 'null':
        if (prop !== null) {
          badType(propName, validatorType, prop, componentName);
        }
        break;

      case 'enum':
      {
        const { data: values } = validator;

        if (
          !values.is('array')
            || !values.every((value) => value.is('string') || value.is('number'))
        ) {
          error(`expected enum values of prop "${propName}" of component "${componentName}" to be an array of type "<${['string', 'number'].join('|')}>"`);
        }

        if (!values.some((v) => v === prop)) {
          const expectedValues = `[${values.join('|')}]`;
          badValue(propName, expectedValues, prop, componentName);
        }

        break;
      }

      case 'structure':
      {
        const { data: structure } = validator;

        if (!structure?.is('object')) {
          error(`expected structure of prop "${propName}" of component "${componentName}" to be an object`);
        }

        if (!prop?.is('object')) {
          error(`expected prop "${propName}" of component "${componentName}" to be an object`);
        }

        checkPropTypes(structure, prop, component);
        break;
      }

      default:
        if (!prop?.is(validatorType)) {
          badType(propName, validatorType, prop, componentName);
        }
    }
  });
};

const getValidator = (type, data, required) => ({
  type,
  data,
  isRequired: required || getValidator(type, data, true),
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
  structure: (props) => getValidator('structure', props),
};
