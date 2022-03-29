import Act from '/lib/act.js';

export default class Error extends Act.Component {
  constructor() {
    super();
    this.state = {
      position: null,
    };
  }

  getCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ position });
    });
  };

  render() {
    this.getCoordinates();
    return Act.createElement('div', {
      class: 'text-center',
    }, [
      Act.createElement('h1', { class: 'fs-1' }, ['404']),
      Act.createElement('p', {}, ["Cette page n'a pas été trouvée"]),
      this.state.position && Act.createElement('div', {}, [
        Act.createElement('p', {}, ['Mais vous, si !']),
        Act.createElement('p', { class: 'text-danger' }, [
          `( ${this.state.position.coords.latitude} - ${this.state.position.coords.longitude} )`,
        ]),
      ]),
    ]);
  }
}
