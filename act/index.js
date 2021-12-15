const Act = {

  // Act.Component
  Component: class {
    constructor(props) {
      this.props = props;
    }
  },

  // Act.createElement
  createElement: (type, props, children) => {
    // TODO: check PropTypes if component and params types

    const element = { type, props, children };

    return element;
  },

};

export default Act;
