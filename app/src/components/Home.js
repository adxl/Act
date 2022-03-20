import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default class Home extends Act.Component {
  render() {
    return Act.createElement('div', {}, [
      Act.createElement('h1', {}, ['Accueil']),
      Act.createElement('p', {}, ['Menu :']),
      Act.createElement('ul', {}, [
        Act.createElement('li', {}, [
          Link('/page1', {}, 'Page 1'),
        ]),
        Act.createElement('li', {}, [
          Link('/page2', {}, 'Page 2'),
        ]),
        Act.createElement('li', {}, [
          Link('/page3', {}, "Page 3 (n'existe pas !)"),
        ]),
      ]),
    ]);
  }
}
