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
        width='3840'
        height='2160'
        primaryImage='./left.jpg'
        secondaryImage='./right.jpg'
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
