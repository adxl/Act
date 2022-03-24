import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default class Home extends Act.Component {
  render() {
    return Act.createElement('div', {
      class: 'text-center',
    }, [
      Act.createElement('h1', {}, ['Home']),
    ]);
  }
}
