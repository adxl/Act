import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default class Page2 extends Act.Component {
  render() {
    return Act.createElement('div', {}, [
      Act.createElement('h1', {}, ['Page 2']),
      Act.createElement('p', {}, [`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
                                                      enim ad minim veniam, quis nostrud exercitation
                                                      ullamco laboris nisi ut aliquip ex ea commodo consequat.`]),
      Link('/', {}, 'Accueil'),
    ]);
  }
}
