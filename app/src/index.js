import Act from '/lib/act.js';
import ActDOM from '/lib/act-dom.js';

import App from './components/App.js';

ActDOM.render(Act.createElement(App), document.getElementById('root'));
