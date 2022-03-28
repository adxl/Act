import Act from '/lib/act.js';
import Router from '/lib/act-router.js';

import Home from './pages/Home.js';
import Randomizer from './pages/Randomizer.js';
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
        component: Act.createElement(Randomizer),
      },
      {
        path: '/page2',
        component: Act.createElement(Page2),
      },
    ], Act.createElement(Error));
  }
}
