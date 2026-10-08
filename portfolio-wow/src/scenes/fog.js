// Scene 0 — the fog field. One full-screen fragment shader, rendered at low resolution
// (fog is soft by nature, so upscaling is free quality). Uniforms are driven by scroll.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = (octaves) => `
precision mediump float;
uniform vec2 uRes;
uniform float uTime, uTravel, uDensity, uDark;
uniform vec3 uGround, uSodium;
uniform vec4 uLamp[4];

float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float noise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p){ float a = 0.5, s = 0.0; for (int i = 0; i < ${octaves}; i++){ s += a * noise(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= 0.5; } return s; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  // the camera travels forward through the field as you scroll; fog also drifts on its own
  float z = uTravel * 0.32 + uTime * 0.022;
  vec2 q = p * 1.5 + vec2(uTime * 0.012, uTravel * 0.22);
  float w = fbm(vec3(q * 1.1, z));
  float n = fbm(vec3(q * 1.8 + w * 1.5, z * 1.3 + 4.0));
  float amt = smoothstep(0.3, 0.84, n) * uDensity;

  vec3 lightFog = mix(uGround, vec3(1.0), 0.48);
  vec3 darkFog = uGround + vec3(0.11, 0.125, 0.115);
  vec3 fogCol = mix(lightFog, darkFog, uDark);
  vec3 col = mix(uGround * (1.0 - 0.06 * uDensity * (1.0 - n)), fogCol, amt);

  // sodium lamps: a hot core and a halo scattered by the fog around it
  float aspect = uRes.x / uRes.y;
  for (int i = 0; i < 4; i++){
    vec4 L = uLamp[i];
    if (L.w <= 0.001) continue;
    vec2 d = (uv - L.xy) * vec2(aspect, 1.0);
    float d2 = dot(d, d);
    float halo = exp(-d2 / (L.z * L.z));
    float core = exp(-d2 / (L.z * L.z * 0.006));
    col += uSodium * L.w * (halo * (0.25 + 0.95 * n) * 0.6 + core * 0.9);
  }

  col *= 1.0 - uDark * 0.28 * dot(p, p);
  col += (hash(vec3(gl_FragCoord.xy, floor(uTime * 24.0))) - 0.5) * 0.028;
  gl_FragColor = vec4(col, 1.0);
}`;

export function createFog(canvas, { coarse }) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG(coarse ? 3 : 4)));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) {
    console.warn('[fog] shader unavailable, using flat ground', e);
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = {};
  ['uRes', 'uTime', 'uTravel', 'uDensity', 'uDark', 'uGround', 'uSodium', 'uLamp'].forEach(
    (n) => (u[n] = gl.getUniformLocation(prog, n)),
  );
  const lamps = new Float32Array(16);
  const scale = coarse ? 0.33 : 0.5;
  let cssH = 1;

  function resize() {
    cssH = canvas.clientHeight || window.innerHeight;
    const w = Math.max(2, Math.round((canvas.clientWidth || window.innerWidth) * scale));
    const h = Math.max(2, Math.round(cssH * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.uRes, w, h);
  }

  function render(f) {
    gl.uniform1f(u.uTime, f.time);
    gl.uniform1f(u.uTravel, f.travel);
    gl.uniform1f(u.uDensity, f.density);
    gl.uniform1f(u.uDark, f.dark);
    gl.uniform3fv(u.uGround, f.ground);
    gl.uniform3fv(u.uSodium, f.sodium);
    lamps.fill(0);
    const vw = canvas.clientWidth || window.innerWidth;
    (f.lamps || []).slice(0, 4).forEach((L, i) => {
      lamps[i * 4] = L.x / vw;
      lamps[i * 4 + 1] = 1 - L.y / cssH;
      lamps[i * 4 + 2] = L.r / cssH;
      lamps[i * 4 + 3] = L.a;
    });
    gl.uniform4fv(u.uLamp, lamps);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  resize();
  return { resize, render };
}
