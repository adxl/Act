import Act from '/lib/act.js';
import Router from '/lib/act-router.js';

import Home from './pages/Home.js';
import Randomizer from './pages/Randomizer.js';
import Fetcher from './pages/Fetcher.js';
import Animal from './pages/Animal.js';

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
        path: '/fetch',
        component: Act.createElement(Fetcher),
      },
      {
        path: '/animal',
        component: Act.createElement(Animal),
      },
    ], Act.createElement(Error));
  }
}
