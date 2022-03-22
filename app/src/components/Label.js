import Act from '/lib/act.js';
import PropTypes from '/lib/prop-types.js';

class Label extends Act.Component {
  render() {
    return Act.createElement('p', {}, [this.props.content.value]);
  }
}

Label.propTypes = {
  content: PropTypes.structure({
    value: PropTypes.number,
    color: PropTypes.string.isRequired,
  }),
};

export default Label;
