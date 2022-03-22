import Act from '/lib/act.js';

export default class Button extends Act.Component {
  randomize = () => {
    const r = Math.floor(Math.random() * (100 - 1) + 1);
    this.props.handleClick(r);
  };

  render() {
    return Act.createElement('button', {
      onClick: this.randomize,
    }, ['Randomize']);
  }
}
