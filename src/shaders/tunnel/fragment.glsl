precision mediump float;
varying vec2 vUv;
uniform float uTime;

void main() {
    // Animer la position des traits avec uTime
    float movingUv = vUv.x + uTime * 0.05;
    
    // Créer des traits verticaux animés
    float strength = mod(movingUv * 10.0, 1.0);
    strength = step(0.8, strength);

    // Colorer les traits en rouge (R=1.0, G=0.0, B=0.0)
    gl_FragColor = vec4(strength, 0.0, 0.0, 1.0);
}
