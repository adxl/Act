import Act from '/lib/act.js';
import { Link } from '../../../lib/act-router.js';

class Nav extends Act.Component {
  render() {
    return Act.createElement('nav', {
      class: 'navbar navbar-expand-lg navbar-light bg-light mb-5',
    }, [
      Act.createElement('div', {
        class: 'container-fluid',
      }, [
        Link('/', { class: 'navbar-brand' }, 'Accueil'),
        Act.createElement('div', {}, [
          Act.createElement('div', { class: 'navbar-nav' }, [
            Link('/randomizer', { class: 'nav-link' }, 'Randomizer'),
            Link('/posts', { class: 'nav-link' }, 'Posts'),
            Link('/zoo', { class: 'nav-link' }, 'Le Zoo'),
            Link('/404', { class: 'nav-link' }, 'Void 💀'),
          ]),
        ]),
      ]),
    ]);
  }
}

export default Nav;
