import Act from '/lib/act.js';

export default class Home extends Act.Component {
  render() {
    return Act.createElement('div', {
      class: 'text-center',
    }, [
      Act.createElement('h1', {
        class: 'mb-3',
      }, ['Accueil']),
      Act.createElement('p', {
        class: 'mb-5',
      }, [
        'Bienvenue sur notre site, vous pouvez consulter les différentes pages depuis la barre de navigation.',
      ]),
      Act.createElement('p', {}, ['Bonne visite ✌️']),
    ]);
  }
}
