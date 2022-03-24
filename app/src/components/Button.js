import Act from '/lib/act.js';
import PropTypes from '/lib/prop-types.js';

class Button extends Act.Component {
  randomize = () => {
    const r = Math.floor(Math.random() * (100 - 1) + 1);
    this.props.handleClick(r);
  };

  render() {
    return Act.createElement('button', {
      onClick: this.randomize,
      class: `btn btn-${this.props.color} text-white`,
    }, [this.props.label]);
  }
}

Button.propTypes = {
  handleClick: PropTypes.function,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Button;
