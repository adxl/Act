import Act from '/lib/act.js';
import PropTypes from '/lib/prop-types.js';

class Label extends Act.Component {
  render() {
    return Act.createElement('p', {}, [this.props.content]);
  }
}

Label.propTypes = {
  content: PropTypes.number,
};

export default Label;
