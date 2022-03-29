import Act from '/lib/act.js';
import PropTypes from '/lib/prop-types.js';

class Post extends Act.Component {
  render() {
    return Act.createElement('div', { class: 'col-3' }, [
      Act.createElement('div', { class: 'card text-dark' }, [
        Act.createElement('div', { class: 'card-body' }, [
          Act.createElement('h5', { class: 'card-title text-start' }, [this.props.content.title]),
          Act.createElement('p', { class: 'card-text' }, [this.props.content.body]),
        ]),
      ]),
    ]);
  }
}

Post.propTypes = {
  content: PropTypes.structure({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default Post;
