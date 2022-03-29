import Act from '/lib/act.js';

export default class Zoo extends Act.Component {
  constructor() {
    super();
    this.state = {
      animals: [
        { name: 'ours', appearance: { color: { name: 'marron' } }, image: { value: '🐻' } },
        { name: 'loup', appearance: { color: { name: 'grise' } }, image: { value: '🐺' } },
        { name: 'cheval', appearance: { color: { name: 'blanche' } }, image: { value: '🐴' } },
        { name: 'poisson', appearance: { color: { name: 'rouge' } }, image: { value: '🐟' } },
      ],

    };
  }

  render() {
    return Act.createElement(
      'div',
      { class: 'd-flex flex-column align-items-center' },
      [
        Act.createElement('h1', { class: 'text-capitalize mb-5' }, ['Le Zoo']),
        Act.createElement('p', { class: 'mb-3' }, ['Voici les animaux du zoo']),
        Act.createElement('hr', { class: 'text-white w-25 mb-5' }),

        ...this.state.animals.map((animal) => (
          Act.createElement(
            'p',
            { template: animal },
            ['{{ image.value }} Voici un {{ name }}, il est de couleur {{ appearance.color.name }} '],
          )
        )),
      ],
    );
  }
}
