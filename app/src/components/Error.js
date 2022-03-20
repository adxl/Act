import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default class Error extends Act.Component {
  render() {
    return Act.createElement('div', {}, [
      Act.createElement('p', {}, ['404']),
      Act.createElement('p', {}, ['Page Introuvable']),
      Link('/', {}, "Retour à l'accueil"),
    ]);
  }
}
