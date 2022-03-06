import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default function Page2() {
  return Act.createElement('div', {}, [
    Act.createElement('p', {}, ['Page 2']),
    Link('/', {}, 'Accueil'),
  ]);
}
