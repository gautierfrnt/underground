precision mediump float;
uniform float uTime;

void main() {
    float bpm = 202.0;
    float period = 60.0 / bpm; // Période en secondes pour un battement
    float phase = mod(uTime, period); // Temps écoulé dans le cycle actuel
 
    float fadeDuration = 0.2;

    float isRed = 1.0 - smoothstep(0.0, fadeDuration, phase);

    vec3 color = vec3(1.0, 0.0, 0.0) * isRed;

    gl_FragColor = vec4(color, 1.0);
}
