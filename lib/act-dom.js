import Act from '/lib/act.js';

String.prototype.interpolate = function (values) {
  return this;
};

export const getNode = (component) => {
  let node = component._node;

  if (typeof node === 'undefined') return null;

  while (node.__v) {
    node = node._node;
  }
  return node;
};

export const getParentNode = (component) => {
  const node = getNode(component);
  return node ? node.parentNode : null;
};

const sameProps = (p1, p2) => (
  JSON.stringify(p1) === JSON.stringify(p2)
);

const createNode = (component, parent) => {
  if (component == null) {
    return null;
  }

  if (typeof component.type === 'function') {
    if (parent) {
      const instance = parent._instances.find((i) => i instanceof component.type
      && sameProps(component.props, i.props));
      if (instance) {
        const instanceIndex = parent._instances.indexOf(instance);

        const prevProps = instance.props;

        instance.props = component.props;
        instance.prevProps = prevProps;

        const vNode = instance.display(prevProps);
        parent._instances.splice(instanceIndex, 1);
        parent._instances.push(instance);

        if (!vNode) {
          return getParentNode(instance);
        }

        return createNode(vNode);
      }
    }

    component = new component.type(component.props);
    component.componentDidMount();

    if (parent) {
      parent._instances.push(component);
    }
  }

  if (component instanceof Act.Component) {
    const vNode = component.render();

    component._node = vNode;
    vNode.parentComponent = component;

    return createNode(vNode);
  }

  const node = document.createElement(component.type);
  component._node = node;

  for (const p in component.props) {
    if (/on([A-Z].*)/.test(p)) {
      const eventName = p.match(/on([A-Z].*)/)[1].toLowerCase();
      node.addEventListener(eventName, component.props[p]);
    } else if (/data-(\w+)/.test(p)) {
      node.dataset[p] = component.props[p];
    } else {
      node.setAttribute(p, component.props[p]);
    }
  }

  if (!component.children) {
    return node;
  }

  component.children.forEach((child) => {
    if (!child || Array.isArray(child) || (typeof child === 'object' && !child.type)) return;

    if (typeof child === 'string' || typeof child === 'number') {
      const _node = document.createTextNode(child.toString().interpolate({}));
      component._node = _node;
      node.appendChild(_node);
    } else {
      const _node = createNode(child, component.parentComponent);
      if (_node == null) {
        return;
      }
      node.appendChild(_node);
    }
  });

  node.removeAttribute('is');
  return node;
};

export default {
  render: (component, parentNode) => {
    const node = createNode(component);

    if (node === null) return;

    if (parentNode.firstChild) {
      parentNode.replaceChild(node, parentNode.firstChild);
    } else {
      parentNode.appendChild(node);
    }
  },
};
