import React, { Component } from 'react';
import styled, { css } from 'styled-components';

export default class DropdownCategory extends Component {
  render() {
    return (
      <Container>
        <Tab onClick={this.props.onDropToggle}>
          <span>{this.props.name}</span>
          <i>{this.props.isDropped ? '▲' : '▼'}</i>
        </Tab>
        {this.props.isDropped && (
          <DroppedContainer>
            {this.props.options && (
              <DropdownContainer>
                <select
                  onChange={evt => this.props.onLeftChange(evt.target.value)}
                >
                  {Object.keys(this.props.options).map(opt => (
                    <option value={opt} selected={this.props.left === opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <select
                  onChange={evt => this.props.onRightChange(evt.target.value)}
                >
                  {Object.keys(this.props.options).map(opt => (
                    <option value={opt} selected={this.props.right === opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </DropdownContainer>
            )}
            <ViewButton onClick={this.props.onView}>View</ViewButton>
          </DroppedContainer>
        )}
      </Container>
    );
  }
}

const ViewButton = styled.button`
  border: none;
  outline: none;
  background-color: green;
  color: white;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  padding: 8px 15px;
  cursor: pointer;
`;

const DroppedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
  > select:first-of-type {
    margin-right: 30px;
  }
`;

const Tab = styled.div`
  width: 400px;
  height: 60px;
  background-color: gray;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  &,
  * {
    cursor: pointer;
  }

  span {
    color: black;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
  }

  i {
    position: absolute;
    top: 50%;

    transform: translate(0, -50%);

    right: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
