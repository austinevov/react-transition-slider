import React, { Component } from 'react';
import styled, { css } from 'styled-components';

export default class DropdownList extends Component {
  state = {
    droppedIndex: 0
  };

  toggleDrop = name => {
    const droppedIndex = this.state.droppedIndex;
    if (name === 'kitchen' && droppedIndex === 0) {
      this.setState({ droppedIndex: 1 });
    } else if (name === 'kitchen') {
      this.setState({ droppedIndex: 0 });
    } else if (name === 'bathroom' && droppedIndex === 1) {
      this.setState({ droppedIndex: 0 });
    } else if (name === 'bathroom') {
      this.setState({ droppedIndex: 1 });
    } else if (name === 'bedroom' && droppedIndex === 2) {
      this.setState({ droppedIndex: 1 });
    } else if (name === 'bedroom') {
      this.setState({ droppedIndex: 2 });
    } else if (name === 'modelliving' && droppedIndex === 3) {
      this.setState({ droppedIndex: 2 });
    } else if (name === 'modelliving') {
      this.setState({ droppedIndex: 3 });
    } else if (name === 'livingroom' && droppedIndex === 4) {
      this.setState({ droppedIndex: 3 });
    } else if (name === 'livingroom') {
      this.setState({ droppedIndex: 4 });
    }
  };

  render() {
    return (
      <Container>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            isDropped: this.state.droppedIndex === index,
            onDropToggle: () => this.toggleDrop(child.props.name.toLowerCase())
          });
        })}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;
