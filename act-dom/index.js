/* eslint-disable no-unused-vars */
export default {
  render: (rootComponent, rootElement) => {
    // TODO: first render
  },

};

const createDom = (structure) => {
  const node = document.createElement(structure.type);
  if (structure.attributes) {
    for (const attName in structure.attributes) {
      if (/on([A-Z].*)/.test(attName)) {
        const eventName = attName.match(/on([A-Z].*)/)[1].toLowerCase();
        node.addEventListener(eventName, structure.attributes[attName]);
      } else {
        node.setAttribute(attName, structure.attributes[attName]);
      }
    }
  }
  if (structure.dataset) {
    for (const attName in structure.dataset) {
      node.dataset[attName] = structure.dataset[attName];
    }
  }
  if (structure.children) {
    for (const child of structure.children) {
      if (child === undefined) continue;
      if (typeof child === 'string') {
        node.appendChild(
          document.createTextNode(child.interpolate(structure.attributes)),
        );
      } else {
        node.appendChild(generateStructure(child));
      }
    }
  }
  structure.node = node;

  return node;
};
