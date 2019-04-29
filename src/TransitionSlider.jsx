import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import vertexSource from './vertex.glsl';
import fragmentSource from './fragment.glsl';
import { compileProgram, createTriangle, createTexture } from './webgl';
import Dragger from './Dragger';

export default class TransitionSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    primaryImage: PropTypes.string,
    secondaryImage: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
  };

  componentDidMount = () => {
    if (this.canvas) {
      this.gl = this.canvas.getContext('webgl', { antialias: true });
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);

      this.program = compileProgram(this.gl, vertexSource, fragmentSource);
      this.vbo = createTriangle(this.gl, this.program);

      this.primaryTexture = createTexture(this.gl, this.props.primaryImage);
      this.secondaryTexture = createTexture(this.gl, this.props.secondaryImage);

      this.gl.useProgram(this.program);
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.primaryTexture);
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.secondaryTexture);

      this.uniforms = {};
      this.uniforms['u_texture0'] = this.gl.getUniformLocation(
        this.program,
        'u_texture0'
      );
      this.uniforms['u_texture1'] = this.gl.getUniformLocation(
        this.program,
        'u_texture1'
      );
      this.uniforms['u_resolution'] = this.gl.getUniformLocation(
        this.program,
        'u_resolution'
      );
      this.uniforms['u_sliderX'] = this.gl.getUniformLocation(
        this.program,
        'u_sliderX'
      );

      this.gl.uniform1i(this.uniforms.u_texture0, 0);
      this.gl.uniform1i(this.uniforms.u_texture1, 1);
      this.gl.uniform2f(
        this.uniforms.u_resolution,
        this.props.width,
        this.props.height
      );
      this.gl.uniform1f(this.uniforms.u_sliderX, 0);

      this.start = performance.now();

      this.canvas.width = this.props.width;
      this.canvas.height = this.props.height;

      this.animate();
    }
  };

  animate = () => {
    this.gl.viewport(0, 0, this.props.width, this.props.height);
    this.gl.uniform1f(this.uniforms.u_sliderX, this.delta);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    requestAnimationFrame(this.animate);
  };

  updateSlider = x => {
    this.delta = x;
  };

  render() {
    return (
      <Container
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}
      >
        <Canvas
          ref={canvas => {
            this.canvas = canvas;
          }}
        />
        <Dragger
          maxRange={this.props.width}
          onSliderChange={this.updateSlider}
        />
      </Container>
    );
  }
}

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `};
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `};

  position: relative;
`;
