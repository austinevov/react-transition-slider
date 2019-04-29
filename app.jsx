import React from 'react';
import ReactDOM from 'react-dom';

import TransitionSlider from '../src/TransitionSlider';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <TransitionSlider
        width='1280'
        height='720'
        primaryImage='./left.jpg'
        secondaryImage='./right.jpg'
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
