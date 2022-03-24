import Act from '/lib/act.js';
import Router from '/lib/act-router.js';

import Home from './pages/Home.js';
import Page1 from './pages/Page1.js';
import Page2 from './pages/Page2.js';

import Error from './pages/Error.js';

export default class Routing extends Act.Component {
  render() {
    return Router([
      {
        path: '/',
        component: Act.createElement(Home),
      },
      {
        path: '/page1',
        component: Act.createElement(Page1),
      },
      {
        path: '/page2',
        component: Act.createElement(Page2),
      },
    ], Act.createElement(Error));
  }
}
