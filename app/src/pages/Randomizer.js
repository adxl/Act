import Act from '/lib/act.js';

import Button from '../components/Button.js';
import Label from '../components/Label.js';

export default class Randomizer extends Act.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        value: 1,
        color: 'red',
      },
      isFullScreen: false,
    };
  }

  componentDidMount() {
    console.info('The randomizer component has been mounted successfully !');
  }

  changeLabelValue = (value) => {
    this.setState({ content: { value } });
  };

  toggleFullScreen = () => {
    if (!this.state.isFullScreen) {
      document.documentElement.requestFullscreen()
        .then(() => {
          console.debug('Fullscreen: ON');
          this.setState({ ...this.state, isFullScreen: true });
        });
    } else {
      document.exitFullscreen().then(() => {
        console.debug('Fullscreen: OFF');
      }).catch(() => {
        console.error('Cheater!');
      }).finally(() => {
        this.setState({ ...this.state, isFullScreen: false });
      });
    }
  };

  render() {
    return Act.createElement('div', {
      class: 'text-center',
    }, [
      Act.createElement('h1', { class: 'text-uppercase' }, ['The Randomizer']),
      Act.createElement(Button, {
        handleClick: this.changeLabelValue,
        color: 'info',
        label: 'Randomize!',
      }),
      Act.createElement(Label, {
        content: this.state.content,
      }),
      Act.createElement(Button, {
        handleClick: this.toggleFullScreen,
        color: 'link',
        label: this.state.isFullScreen ? 'Leave fullscreen' : 'Go fullscreen',
      }),
    ]);
  }
}