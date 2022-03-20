import Act from '/lib/act.js';

export default class Label extends Act.Component {
  render() {
    return Act.createElement('p', {}, [this.props.content]);
  }
}
