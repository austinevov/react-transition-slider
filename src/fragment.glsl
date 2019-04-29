precision mediump float;

uniform sampler2D u_texture0;
uniform sampler2D u_texture1;

uniform vec2 u_resolution;

uniform float u_sliderX;

void main() 
{
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.y = 1.0 - uv.y;

  float sliderX = u_sliderX;
  float x = uv.x * u_resolution.x;
  vec3 primary = texture2D(u_texture0, uv).rgb;
  vec3 secondary = texture2D(u_texture1, uv).rgb;

  float switcher = step(sliderX, x);
  vec3 col = mix(primary, secondary, switcher);

  gl_FragColor = vec4(col, 1.);
}