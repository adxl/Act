import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default function Page1() {
  return Act.createElement('div', {}, [
    Act.createElement('p', {}, ['Page 1']),
    Link('/', {}, 'Accueil'),
  ]);
}
