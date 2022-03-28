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
        Act.createElement('a', { class: 'navbar-brand' }, ['Logo']),
        Act.createElement('div', {}, [
          Act.createElement('div', { class: 'navbar-nav' }, [
            Link('/', { class: 'nav-link' }, 'Home'),
            Link('/page1', { class: 'nav-link' }, 'Randomizer'),
            Link('/fetch', { class: 'nav-link' }, 'Fetcher'),
            Link('/animal', { class: 'nav-link' }, 'Animal '),
            Link('/404', { class: 'nav-link' }, 'Void 💀'),
          ]),
        ]),
      ]),
    ]);
  }
}

export default Nav;
