import ActDOM, { getParentNode } from '/lib/act-dom.js';
import { checkPropTypes } from '/lib/prop-types.js';

class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};

    this._prevState = {};

    this._node = null;
    this._instances = [];
  }

  shouldComponentUpdate(prevProps) {
    if (typeof this._node === 'undefined') return true;

    return JSON.stringify(this.props) !== JSON.stringify(prevProps)
          || JSON.stringify(this.state) !== JSON.stringify(this._prevState);
  }

  shouldUpdate() {
    return true;
  }

  setState(state) {
    this._prevState = this.state;
    this.state = { ...this.state, ...state };
    this.display(this.props);
  }

  display(prevProps) {
    if (typeof this.shouldUpdate !== 'function') {
      throw new Error('Component.shouldUpdate must be a function');
    }

    const shouldUpdate = (
      this.shouldComponentUpdate(prevProps) && this.shouldUpdate(prevProps, this._prevState)
    );

    if (shouldUpdate) {
      const parentNode = getParentNode(this);
      if (parentNode) {
        return ActDOM.render(this, parentNode);
      }
    }

    return null;
  }

  render() {
    throw new Error('Component must have a render() method');
  }
}

const createElement = (type, props = {}, children = []) => {
  if (typeof type === 'function' && typeof type.propTypes !== 'undefined') {
    checkPropTypes(type.propTypes, props, type);
  }

  return {
    type,
    props,
    children,
    __v: true,
  };
};

export default {
  Component,
  createElement,
};
