import Act from '/lib/act.js';
import Routing from './Routing.js';

import Nav from './components/Nav.js';

export default class App extends Act.Component {
  render() {
    return Act.createElement('div', {}, [
      Act.createElement(Nav),
      Act.createElement('div', {
        id: 'router',
      }, [
        Act.createElement(Routing),
      ]),
    ]);
  }
}
