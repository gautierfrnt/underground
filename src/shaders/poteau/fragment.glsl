precision mediump float;
varying vec2 vUv;
uniform float uTime;

void main() {
    // Animer la position des traits avec uTime
    float movingUv = vUv.y - uTime * 0.1; 

    // Créer des traits horizontaux animés
    float pattern = mod(movingUv * 10.0, 1.0); // Ajuste la densité des traits avec 10.0
    float strength = step(0.9, pattern); // Ajuste l'épaisseur des traits avec 0.9

    // Colorer les traits en rouge (R=1.0, G=0.0, B=0.0)
    gl_FragColor = vec4(strength, 0.0, 0.0, 1.0);
}
