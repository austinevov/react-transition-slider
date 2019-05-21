import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import TransitionSlider from '../src/TransitionSlider';
import DropdownList from '../src/scaffolding/DropdownList';
import DropdownCategory from '../src/scaffolding/DropdownCategory';

const kitchenOptions = {
  amethyst: 'amethyst_kitchen.png',
  fluorite: 'fluorite_kitchen.png',
  topaz: 'topaz_kitchen.png',
  sapphire: 'sapphire_kitchen.png'
};

const bathroomOptions = {
  amethyst: 'amethyst_bathroom.jpg',
  sapphire: 'sapphire_bathroom.jpg',
  topaz: 'topaz_bathroom.jpg'
};

class App extends React.Component {
  state = {
    kitchenLeft: 'amethyst',
    kitchenRight: 'fluorite',
    bathroomLeft: 'amethyst',
    bathroomRight: 'topaz',
    isViewingSlider: true,
    sliderType: 'kitchen'
  };

  updateKitchenLeft = name => {
    this.setState({ kitchenLeft: name });
  };

  updateKitchenRight = name => {
    this.setState({ kitchenRight: name });
  };

  updateBathroomLeft = name => {
    this.setState({ bathroomLeft: name });
  };

  updateBathroomRight = name => {
    this.setState({ bathroomRight: name });
  };

  viewKitchen = () => {
    this.setState({ isViewingSlider: true, sliderType: 'kitchen' });
  };

  viewBathroom = () => {
    this.setState({ isViewingSlider: true, sliderType: 'bathroom' });
  };

  viewBedroom = () => {
    this.setState({ isViewingSlider: true, sliderType: 'bedroom' });
  };

  viewModelLiving = () => {
    this.setState({ isViewingSlider: true, sliderType: 'modelliving' });
  };

  viewLiving = () => {
    this.setState({ isViewingSlider: true, sliderType: 'living' });
  };

  constructor() {
    super();
  }
  render() {
    let primaryImage = kitchenOptions[this.state.kitchenLeft];
    let secondaryImage = kitchenOptions[this.state.kitchenRight];
    if (this.state.sliderType === 'bathroom') {
      primaryImage = bathroomOptions[this.state.bathroomLeft];
      secondaryImage = bathroomOptions[this.state.bathroomRight];
    } else if (this.state.sliderType === 'bedroom') {
      primaryImage = 'bedRight.jpg';
      secondaryImage = 'bedLeft.jpg';
    } else if (this.state.sliderType === 'modelliving') {
      primaryImage = 'modelLivingRight.jpg';
      secondaryImage = 'modelLivingLeft.jpg';
    } else if (this.state.sliderType === 'living') {
      primaryImage = 'livingRoomRight.jpg';
      secondaryImage = 'livingRoomLeft.jpg';
    }
    return (
      <div>
        {this.state.isViewingSlider ? (
          <PreviewContainer>
            <BackButton
              onClick={() => this.setState({ isViewingSlider: false })}
            >
              Back
            </BackButton>
            <TransitionSlider
              width={`${window.innerWidth}`}
              height={`${window.innerWidth / 1.77778}`}
              primaryImage={primaryImage}
              secondaryImage={secondaryImage}
            />
          </PreviewContainer>
        ) : (
          <DropdownList>
            <DropdownCategory
              name='Kitchen'
              key='kitchen'
              options={kitchenOptions}
              left={this.state.kitchenLeft}
              right={this.state.kitchenRight}
              onLeftChange={this.updateKitchenLeft}
              onRightChange={this.updateKitchenRight}
              onView={() => this.viewKitchen()}
            />
            <DropdownCategory
              name='Bathroom'
              key='bathroom'
              options={bathroomOptions}
              left={this.state.bathroomLeft}
              right={this.state.bathroomRight}
              onLeftChange={this.updateBathroomLeft}
              onRightChange={this.updateBathroomRight}
              onView={() => this.viewBathroom()}
            />
            <DropdownCategory
              name='Bedroom'
              key='Bedroom'
              onView={() => this.viewBedroom()}
            />
            <DropdownCategory
              name='ModelLiving'
              key='Model Living Room'
              onView={() => this.viewModelLiving()}
            />
            <DropdownCategory
              name='LivingRoom'
              key='Living Room'
              onView={() => this.viewLiving()}
            />
          </DropdownList>
        )}
        <i style={{ marginTop: '30px' }}>
          This UI was created by a programmer and is not representative of the
          finished product nor of Evolution Virtual's design standards.
        </i>
      </div>
    );
  }
}

const BackButton = styled.button`
  margin-bottom: 10px;
`;
const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

ReactDOM.render(<App />, document.getElementById('container'));
