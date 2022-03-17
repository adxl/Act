const root = document.querySelector('#root');
String.prototype.interpolate = function (values) {
  return this;
};

const createDom = (structure) => {
  const node = document.createElement(structure.type);

  for (const p in structure.props) {
    if (/on([A-Z].*)/.test(p)) {
      const eventName = p.match(/on([A-Z].*)/)[1].toLowerCase();
      node.addEventListener(eventName, structure.props[p]);
    } else if (/data-(\w+)/.test(p)) {
      node.dataset[p] = structure.props[p];
    } else {
      node.setAttribute(p, structure.props[p]);
    }
  }

  for (const child of structure.children) {
    if (typeof child === 'string') {
      node.appendChild(
        document.createTextNode(child.interpolate({})),
      );
    } else {
      node.appendChild(createDom(child));
    }
  }

  return node;
};

export default {
  render: (rootComponent, rootElement) => {
    if (rootElement.firstChild) {
      rootElement.replaceChild(createDom(rootComponent), root.firstChild);
    } else {
      rootElement.appendChild(createDom(rootComponent));
    }
  },
};
