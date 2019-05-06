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
    }
  };

  render() {
    console.log('children', this.props.children);
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
