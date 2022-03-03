const root = document.querySelector("#root");
String.prototype.interpolate = function () {
  return this;
};

/* eslint-disable no-unused-vars */
export default {
  render: (rootComponent, rootElement) => {
    
  },

};

function link(label, path) {
  return {
    type: "a",
    attributes: {
      href: path,
      onClick: (e) => {
        e.preventDefault();
        history.pushState({ title: label }, label, path);
        root.dispatchEvent(new Event("rerender"));
      },
    },
    children: [label],
  };
}

function simpleText(text) {
    return {
      type: "p",
      attributes: {
        class: "text-style"
      },
      children: [text],
    };
}

function Page1() {
  return {
    type: "div",
    children: [
      simpleText("Page1"), 
      link("Page 2", "/page2")],
  };
}

function Page2() {
  return {
    type: "div",
    children: [simpleText("Page2"), link("Page 1", "/page1")],
  };
}

function generatePage() {
  document.title = history?.state?.title;
  const currentPath = window.location.pathname;
  let elem
  switch (currentPath) {
      case "/page1":
        elem = Page1();
        break;
      case "/page2":
        elem = Page2();
        break;
  }
  if (root.firstChild) {
    root.replaceChild(createDom(elem), root.firstChild);
  } else {
    root.appendChild(createDom(elem));
  }
}

root.addEventListener("rerender", generatePage);

window.onpopstate = () => root.dispatchEvent(new Event("rerender"));

const createDom = (structure) => {
  const node = document.createElement(structure.type);
  if (structure.attributes) {
    for (let attName in structure.attributes) {
      if (/on([A-Z].*)/.test(attName)) {
        const eventName = attName.match(/on([A-Z].*)/)[1].toLowerCase();
        node.addEventListener(eventName, structure.attributes[attName]);
      } else {
        node.setAttribute(attName, structure.attributes[attName]);
      }
    }
  }
  if (structure.dataset) {
    for (let attName in structure.dataset) {
      node.dataset[attName] = structure.dataset[attName];
    }
  }
  if (structure.children)
    for (let child of structure.children) {
      if (child === undefined) continue;
      if (typeof child === "string") {
        node.appendChild(
          document.createTextNode(child.interpolate(structure.attributes))
        );
      } else {
        node.appendChild(createDom(child));
      }
    }
  structure.node = node;

  return node;
};

root.dispatchEvent(new Event("rerender"));