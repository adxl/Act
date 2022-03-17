import Act from '/lib/act.js';
import Router from '/lib/act-router.js';

import Home from './Home.js';
import Page1 from './Page1.js';
import Page2 from './Page2.js';

import Error from './Error.js';

export default function App() {
  return Router([
    {
      path: '/',
      component: Home(),
    },
    {
      path: '/page1',
      component: Page1(),
    },
    {
      path: '/page2',
      component: Page2(),
    },
  ], Error());
}
