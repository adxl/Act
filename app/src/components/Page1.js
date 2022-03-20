import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';

import Button from './Button.js';
import Label from './Label.js';

export default class Page1 extends Act.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelValue: 0,
    };
  }

  changeLabelValue = (labelValue) => {
    this.setState({ labelValue });
  };

  render() {
    return Act.createElement('div', {}, [
      Act.createElement('p', {}, ['Page 1']),
      Act.createElement(Button, {
        handleClick: this.changeLabelValue,
      }),
      Act.createElement(Label, { content: this.state.labelValue }),
      Link('/', {}, 'Accueil'),
    ]);
  }
}
