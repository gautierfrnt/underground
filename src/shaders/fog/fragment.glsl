uniform float time;
uniform vec3 color;
uniform float density;
uniform float speed;
uniform vec2 resolution;
varying vec2 vUv;
varying vec3 vPosition;

// Fonction de bruit 2D
float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
        u.y);

    return res * res;
}

// Fractional Brownian Motion 2D
float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);

    for (int i = 0; i < 4; ++i) {
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }

    return v;
}

void main() {
    // Coordonnées UV ajustées pour le bruit
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;

    // Ajoute du temps pour animer la fumée
    uv.y += time * speed;

    // Génère du bruit 2D
    float f = fbm(uv * 4.0);

    // Crée un effet de fumée avec une densité variable
    float smokeIntensity = smoothstep(0.2, 0.8, f) * density;

    // Utilise directement la couleur blanche avec une intensité variable
    vec3 smoke = mix(vec3(0.0), color, smokeIntensity);

    // Réduit l'opacité aux bords du plan
    float dist = length(uv);
    smoke *= 1.0 - smoothstep(0.5, 1.5, dist);

    // Applique une opacité variable
    float alpha = smoothstep(0.2, 0.8, f) * 0.8;

    gl_FragColor = vec4(smoke, alpha);
}