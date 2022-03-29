import Act from '/lib/act.js';
import Post from '../components/Post.js';
import Button from '../components/Button.js';

export default class Posts extends Act.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    window.onscroll = () => {
      const { posts } = this.state;
      const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (reachedBottom && posts.length < this.getLocalPosts().length) {
        setTimeout(() => {
          const nextPosts = this.getLocalPosts()
            .slice(posts.length, posts.length + 4)
            .map((e) => this.makePost(e));

          this.setState(
            { posts: [...posts, ...nextPosts] },
          );
        }, 1500);
      }
    };
  }

  getLocalPosts() {
    return JSON.parse(localStorage.getItem('posts')) ?? [];
  }

  makePost = (post) => {
    const { title, body } = post;
    return Act.createElement(Post, { content: { title, body } });
  };

  generate = (posts) => this.setState({
    posts: posts.map((p) => this.makePost(p)),
  });

  fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        this.generate(json.slice(0, 12));
        localStorage.setItem('posts', JSON.stringify(json));
      })
      .catch((error) => console.error('/!\\ An error has occured /!\\ \r\n\r\n', error));
  };

  render() {
    const { posts } = this.state;

    return Act.createElement('div', { class: 'container text-center' }, [
      Act.createElement('h1', { class: 'text-capitalize mb-5' }, ['Nos posts']),
      !posts.length
        ? Act.createElement(Button, {
          color: 'success',
          label: 'Afficher les posts',
          handleClick: this.fetchPosts,
        })
        : Act.createElement('p', {}, ['Scroller pour afficher plus de posts']),
      Act.createElement(
        'div',
        { class: 'row mb-5 gy-5 gx-3 justify-content-center pt-5' },
        posts.length ? posts : [
          Act.createElement('p', { class: 'mt-5' }, ['Aucun post pour le moment']),
        ],
      ),
    ]);
  }
}
