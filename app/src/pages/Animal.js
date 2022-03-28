import Act from '/lib/act.js';

export default class Animal extends Act.Component {

  constructor() {
    super();
    this.state = {
      animal : {
        name: "Cliver",
        color:{
          name:"red"
        },
        
      }
      
    };
  }
  render() {
    return Act.createElement('div', {
      class: 'text-center',
    }, [
      Act.createElement('h1', {template:this.state}, [' Bonjour {{ animal.name }} , je suis de couleur {{ animal.color.name }} '  ]),
    ]);
  }
}
