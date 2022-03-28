import Act from '/lib/act.js';
import PropTypes from '/lib/prop-types.js';

class Post extends Act.Component {
  render() {
    return Act.createElement('div', { class: "col-3" }, [
      Act.createElement('div', { class: "card text-dark p-4" }, [
        Act.createElement('h3', { class: 'text-start text-uppercase' }, [this.props.content.title]),
        Act.createElement('p', {}, [this.props.content.body]),
      ])
    ]);
  }
}

Post.propTypes = {
  content: PropTypes.structure({
    title: PropTypes.string,
    body: PropTypes.string
  }),
};

export default Post;
