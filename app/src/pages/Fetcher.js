import Act from '/lib/act.js';
import { Link } from '/lib/act-router.js';
import Post from '../components/Post.js';

export default class Fetcher extends Act.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    //function when scroll to bottom of page and fetch more posts 
    window.onscroll = () => {
      const { posts } = this.state;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && posts.length < this.getLocalPosts().length) {
        setTimeout(() => { this.setState({ posts: [...posts, ...this.getLocalPosts().slice(posts.length, posts.length + 4).map(e => this.makePost(e))] }) }, 1500);
      }
    }
  }

  getLocalPosts() { //function to get posts from local storage
    return JSON.parse(localStorage.getItem('posts')) ?? [];
  }

  makePost = (post) => {
    const { title, body } = post;
    return Act.createElement(Post, { content: { title, body } });
  };

  generate = posts => this.setState({
    posts: posts.map(p => this.makePost(p))
  });

  fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        this.generate(json.slice(0, 12));
        localStorage.setItem('posts', JSON.stringify(json));
      })
      .catch(error => console.error('/!\\ An error has occured /!\\ \r\n\r\n', error));
  };

  render() {
    return Act.createElement('div', { class: 'container text-center' }, [
      Act.createElement('h1', {}, ['Fetch']),
      Act.createElement('p', {}, ['Scroll to bottom to load new posts']),
      Act.createElement('button', {
        onClick: this.fetchPosts
      }, ['Load posts']),
      Act.createElement('div', { class: 'row mb-5 gy-5 gx-3 justify-content-center pt-5' }, this.state.posts.length ? this.state.posts : ['No posts']),
    ]);
  }
}
