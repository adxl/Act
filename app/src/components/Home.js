import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

export default function Home() {
  return Act.createElement('div', {}, [
    Act.createElement('ul', {}, [
      Act.createElement('li', {}, [
        Link('/page1', {}, 'Page une'),
      ]),
      Act.createElement('li', {}, [
        Link('/page2', {}, 'Page deux'),
      ]),
    ]),
  ]);
}
