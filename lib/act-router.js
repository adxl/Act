import Act from './act.js';
import ActDom from './act-dom.js';

const root = document.querySelector('#root');

let routes = [];
let fallback = null;

const getComponent = () => {
  const { pathname: currentPath } = window.location;
  const route = routes.find((_route) => _route.path === currentPath);
  return route?.component || fallback;
};

root.addEventListener('render', () => ActDom.render(getComponent(), root));
window.onpopstate = () => root.dispatchEvent(new Event('render'));

export default (_routes, _fallback) => {
  routes = _routes;
  fallback = _fallback;
  return getComponent();
};

export const Link = (to, props, children) => Act.createElement(
  'a',
  {
    href: to,
    onClick: (e) => {
      e.preventDefault();
      window.history.pushState({}, '', to);
      root.dispatchEvent(new Event('render'));
    },
    ...props,
  },
  children,
);
