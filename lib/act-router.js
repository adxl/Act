import Act from './act.js';
import ActDom from './act-dom.js';

const root = document.querySelector('#root');

let routes = [];
let FallbackComponent = null;

const getComponent = () => {
  const { pathname: currentPath } = window.location;
  const route = routes.find((_route) => _route.path === currentPath);

  const Component = route?.component;
  return Component || FallbackComponent;
};

root.addEventListener('render', () => {
  const component = getComponent();
  const router = document.querySelector('#router');

  ActDom.render(component, router);
});
window.onpopstate = () => root.dispatchEvent(new Event('render'));

export default (_routes, _fallback) => {
  routes = _routes;
  FallbackComponent = _fallback;
  return getComponent();
};

export const Link = (to, props, label) => Act.createElement(
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
  [label],
);
