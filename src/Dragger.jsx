import React from 'react';
import styled, { css } from 'styled-components';
import { DEFAULT_ORIGIN } from './TransitionSlider';

export default class Dragger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: DEFAULT_ORIGIN,
      isDragging: false
    };
  }

  componentDidMount = () => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleMouseMove);

    this.props.onSliderChange(DEFAULT_ORIGIN);
  };

  handleMouseMove = evt => {
    if (this.state.isDragging) {
      let clientX = 0;
      if (evt.touches && evt.touches.length > 0) {
        clientX = evt.touches[0].clientX;
      } else {
        clientX = evt.clientX;
      }

      const x = Math.min(this.props.maxRange - 10, Math.max(0, clientX));

      this.setState({ x }, () => {
        this.props.onSliderChange(this.state.x);
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
      <Container
        style={{ left: `${this.state.x}px` }}
        onMouseDown={this.startDragging}
        onTouchStart={this.startDragging}
        isDragging={this.state.isDragging}
      >
        <TransitionBubble
          onTouchStart={this.startDragging}
          onMouseDown={this.startDragging}
          isDragging={this.state.isDragging}
        >
          <span>VS.</span>
        </TransitionBubble>
      </Container>
    );
  }
}

const TransitionBubble = styled.div`
  width: 50px;
  height: 50px;
  background-color: #db3b34;
  border-radius: 50%;

  position: absolute;
  bottom: 20%;
  left: -20px;

  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);

  ${props =>
    props.isDragging &&
    css`
      pointer-events: none;
    `}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    cursor: pointer;
    font-family: 'Pacifico', cursive;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    color: white;

    user-select: none;
  }
`;

const Container = styled.div`
  width: 10px;
  height: 100%;
  position: absolute;
  top: 0px;
  background-color: beige;
  cursor: pointer;

  ${props =>
    props.isDragging &&
    css`
      pointer-events: none;
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
