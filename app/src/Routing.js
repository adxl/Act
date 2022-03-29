import Act from '/lib/act.js';
import Router from '/lib/act-router.js';

import Home from './pages/Home.js';
import Randomizer from './pages/Randomizer.js';
import Posts from './pages/Posts.js';
import Zoo from './pages/Zoo.js';

import Error from './pages/Error.js';

export default class Routing extends Act.Component {
  render() {
    return Router([
      {
        path: '/',
        component: Act.createElement(Home),
      },
      {
        path: '/randomizer',
        component: Act.createElement(Randomizer),
      },
      {
        path: '/posts',
        component: Act.createElement(Posts),
      },
      {
        path: '/zoo',
        component: Act.createElement(Zoo),
      },
    ], Act.createElement(Error));
  }
}
