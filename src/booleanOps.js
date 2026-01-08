import * as PIXI from "pixi.js";

export function applyBoolean(app, texA, texB, op, outTex, threshold = 0.5) {
  const shader = `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uA;
    uniform sampler2D uB;
    uniform int uOp;
    uniform float uThreshold;
    void main(){
      vec4 A = texture2D(uA, vTextureCoord);
      vec4 B = texture2D(uB, vTextureCoord);

      float Ab = step(uThreshold, A.r);
      float Bb = step(uThreshold, B.r);

      float o = 0.0;
      if (uOp == 0) o = Ab * Bb;
      else if (uOp == 1) o = max(Ab, Bb);
      else if (uOp == 2) o = abs(Ab - Bb);
      else if (uOp == 3) o = 1.0 - Ab;

      gl_FragColor = vec4(o, o, o, 1.0);
    }
  `;

  const opMap = {
    AND: 0,
    OR: 1,
    XOR: 2,
    NOT_A: 3
  };

  const filter = new PIXI.Filter(undefined, shader, {
    uA: texA,
    uB: texB,
    uOp: opMap[op] ?? 0,
    uThreshold: threshold
  });

  const quad = new PIXI.Sprite(texA);
  quad.filters = [filter];
  app.renderer.render(quad, { renderTexture: outTex, clear: true });
}
