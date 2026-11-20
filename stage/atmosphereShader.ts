// The in-between space: a neutral room with no color and nothing in focus.
// Big soft shapes that never resolve, light falling through, dust in the light,
// film grain. All of it is one fragment shader with no state, so it costs the
// same on the first frame as on the millionth.

export const vertexSource = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

export const fragmentSource = `#version 300 es
precision highp float;

out vec4 outColor;

uniform vec2 uRes;
uniform float uTime;       // air time, already scaled by drift and stir
uniform float uSceneTime;  // counts arrangements of the far shapes
uniform float uTone;
uniform float uDust;
uniform float uDustSize;
uniform float uLight;
uniform float uLightAngle;
uniform float uScenes;
uniform float uGrain;
uniform float uFocus;      // 0 nothing on stage, 1 a piece holds focus
uniform vec2 uPointer;     // -1..1, smoothed

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float amp = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p = p * 2.02 + vec2(17.3, 9.1);
    amp *= 0.5;
  }
  return sum;
}

float sdBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

// One arrangement of far, out-of-focus shapes: doorways, panes, walls. Some
// catch light and some hold shadow. They are far too soft to read.
float arrangement(vec2 p, float k) {
  float acc = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    vec2 h = hash22(vec2(k * 7.31 + fi * 3.7, k * 1.93 + fi * 11.1));
    vec2 h2 = hash22(vec2(k * 2.17 + fi * 5.3, k * 9.41 + fi * 1.7));
    vec2 center = (h - 0.5) * vec2(2.6, 1.3);
    vec2 size = mix(vec2(0.10, 0.22), vec2(0.65, 0.85), h2);
    float soft = mix(0.16, 0.5, hash11(k * 3.3 + fi * 1.3));
    float sign = hash11(k * 5.1 + fi * 2.3) > 0.42 ? 1.0 : -1.0;
    float d = sdBox(p - center, size, 0.06);
    acc += sign * (1.0 - smoothstep(-soft, soft, d)) * mix(0.35, 1.0, h2.x);
  }
  return acc;
}

float farShapes(vec2 p) {
  float k = floor(uSceneTime);
  float f = fract(uSceneTime);
  // Hold an arrangement, then let it turn into the next one.
  float w = smoothstep(0.45, 1.0, f);
  return mix(arrangement(p, k), arrangement(p, k + 1.0), w);
}

// Dust at six depths. Motes near the focal plane are small and sharp; the ones
// in front of it and behind it open up into wide, faint discs.
float dust(vec2 p, float t) {
  float acc = 0.0;
  for (int layer = 0; layer < 6; layer++) {
    float fl = float(layer);
    float z = fl / 5.0;
    float scale = mix(2.6, 15.0, z);
    float coc = abs(z - 0.6);
    float radius = (0.0035 + coc * 0.05) * uDustSize * scale;
    vec2 travel = vec2(
      t * 0.006 * (fl - 2.5) + sin(t * 0.05 + fl * 1.7) * 0.03,
      t * (0.010 + 0.004 * fl)
    );
    vec2 parallax = uPointer * (1.0 - z) * 0.05;
    vec2 q = (p + travel + parallax) * scale + fl * 17.17;
    vec2 cell = floor(q);
    vec2 local = fract(q);

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 id = cell + vec2(float(x), float(y));
        float exists = hash21(id + fl * 3.1);
        if (exists > uDust * 0.8) continue;
        vec2 rnd = hash22(id * 1.37 + fl);
        vec2 wobble = 0.12 * vec2(
          sin(t * 0.31 + rnd.x * 6.283),
          cos(t * 0.23 + rnd.y * 6.283)
        );
        vec2 center = vec2(float(x), float(y)) + 0.15 + rnd * 0.7 + wobble;
        float dist = length(local - center);
        float edge = mix(0.85, 0.22, clamp(coc * 2.2, 0.0, 1.0));
        float disc = smoothstep(radius, radius * (1.0 - edge), dist);
        float glint = 0.55 + 0.45 * sin(t * (0.4 + rnd.x) + rnd.y * 40.0);
        float energy = 1.0 / (1.0 + pow(radius * 26.0, 2.0));
        acc += disc * glint * energy * mix(0.5, 1.0, rnd.y);
      }
    }
  }
  return acc;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  float fog = fbm(p * 1.1 + vec2(t * 0.015, -t * 0.010));
  float lum = mix(0.05, 0.80, uTone) * (0.72 + 0.56 * fog);

  // Far shapes, nudged by the pointer so the room has depth.
  vec2 shapeP = p + uPointer * 0.015 + vec2(sin(t * 0.021), cos(t * 0.017)) * 0.04;
  lum += farShapes(shapeP) * uScenes * mix(0.075, 0.13, uTone);

  // Light through the room: one wide fall and one thin slice beside it.
  vec2 dir = vec2(cos(uLightAngle), sin(uLightAngle));
  vec2 perp = vec2(-dir.y, dir.x);
  vec2 lp = p - vec2(-0.25, 0.1) + uPointer * 0.02;
  float across = dot(lp, perp);
  float along = dot(lp, dir);
  float wide = exp(-pow(across / 0.42, 2.0));
  wide *= mix(0.55, 1.15, fbm(vec2(across * 6.0, along * 0.6 - t * 0.03)));
  float thin = exp(-pow((across - 0.62) / 0.10, 2.0)) * 0.55;
  thin *= fbm(vec2(across * 14.0 + 3.0, along * 0.5 + t * 0.02)) * 1.6;
  float light = (wide + thin) * uLight;
  lum += light * mix(0.12, 0.17, uTone) * (0.55 + 0.9 * fog);

  // Dust shows where the light is and all but vanishes in shadow.
  float motes = dust(p, t) * (0.10 + light * 1.25);
  lum += motes * mix(0.85, 0.22, uTone);

  // Corners fall off, and the room steps back when a piece holds focus.
  lum *= mix(1.0, smoothstep(1.35, 0.15, length(p)), 0.45);
  lum *= mix(1.0, 0.35, uFocus);

  float grain = hash21(gl_FragCoord.xy + fract(t * 7.13) * 311.0) - 0.5;
  lum += grain * uGrain * 0.07;

  outColor = vec4(vec3(clamp(lum, 0.0, 1.0)), 1.0);
}`;
