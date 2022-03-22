import Act from '/lib/act.js';
import Router from '/lib/act-router.js';

import Home from './Home.js';
import Page1 from './Page1.js';
import Page2 from './Page2.js';

import Error from './Error.js';

export default class App extends Act.Component {
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
