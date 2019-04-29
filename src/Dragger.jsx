import React from 'react';
import styled, { css } from 'styled-components';

export default class Dragger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      isDragging: false
    };
  }

  componentDidMount = () => {
    window.addEventListener('mousemove', this.handleMouseMove);

    this.props.onSliderChange(this.state.x + 40);
  };

  handleMouseMove = evt => {
    if (this.state.isDragging) {
      const x = Math.min(this.props.maxRange - 50, Math.max(0, evt.clientX));
      this.setState({ x }, () => {
        this.props.onSliderChange(this.state.x + 40);
      });
    }
  };

  startDragging = () => {
    this.setState({ isDragging: true });
    window.addEventListener('mouseup', this.stopMouseDragging);
    window.addEventListener('contextmenu', this.stopMouseDragging);
  };

  stopMouseDragging = () => {
    this.setState({ isDragging: false });
    window.removeEventListener('mouseup', this.stopMouseDragging);
    window.removeEventListener('mouseout', this.stopMouseDragging);
    window.removeEventListener('contextmenu', this.stopMouseDragging);
    window.removeEventListener('mouseleave', this.stopMouseDragging);
  };

  render() {
    return (
      <Container x={this.state.x}>
        <TabContainer
          onTouchStart={this.startDragging}
          onMouseDown={this.startDragging}
          isDragging={this.state.isDragging}
        />
        <Column
          onMouseDown={this.startDragging}
          isDragging={this.state.isDragging}
        />
      </Container>
    );
  }
}

//80
//40px 20px
const Container = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  top: 0px;

  ${props =>
    props.x &&
    css`
      left: ${props.x}px;
    `}

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
`;

const TabContainer = styled.div`
  width: 40px;
  height: 60px;
  background-color: #3b4056;
  position: absolute;
  bottom: 20%;
  left: 0px;

  ${props =>
    props.isDragging &&
    css`
      pointer-events: none;
    `}
`;

const Column = styled.div`
  width: 10px;
  height: 100%;
  background-color: beige;
  right: 0px;
  top: 0px;
  position: absolute;

  ${props =>
    props.isDragging &&
    css`
      pointer-events: none;
    `}
`;
