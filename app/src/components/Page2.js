import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default class Page2 extends Act.Component {
  render() {
    return Act.createElement('div', {}, [
      Act.createElement('p', {}, ['Page 2']),
      Link('/', {}, 'Accueil'),
    ]);
  }
}
