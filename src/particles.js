import * as THREE from 'three';

function makeCircleTexture(size = 64) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
}

export function createParticles(scene) {
    const particleParams = {
        count: 500,
        size: 0.01,
        color: 0xff2222,
        globalX: 0,
        globalY: 0,
        globalZ: 8,
        amplitudeX: 0.15,
        amplitudeY: 0.25,
        amplitudeZ: 0.15,
        speed: 1.0,
    };

    // Positions
    let basePositions = new Float32Array(particleParams.count * 3);
    let positions = new Float32Array(particleParams.count * 3);

    // Positions initiales
    function generatePositions() {
        basePositions = new Float32Array(particleParams.count * 3);
        positions = new Float32Array(particleParams.count * 3);

        for (let i = 0; i < particleParams.count; i++) {
            const i3 = i * 3;
            basePositions[i3 + 0] = (Math.random() - 0.5) * 10 + particleParams.globalX;
            basePositions[i3 + 1] = Math.random() * 3 + 0.2 + particleParams.globalY;
            basePositions[i3 + 2] = (Math.random() - 0.5) * 10 - 2 + particleParams.globalZ;

            positions[i3 + 0] = basePositions[i3 + 0];
            positions[i3 + 1] = basePositions[i3 + 1];
            positions[i3 + 2] = basePositions[i3 + 2];
        }
    }

    // Géométrie
    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Matériel
    const particleMat = new THREE.PointsMaterial({
        size: particleParams.size,
        map: makeCircleTexture(),
        color: particleParams.color,
    });

    // Système de particules
    const particleSystem = new THREE.Points(particlesGeom, particleMat);
    scene.add(particleSystem);

    /**
     * Animation
     */
    function animateParticles(elapsedTime) {
        const pos = particleSystem.geometry.attributes.position.array;

        for (let i = 0; i < particleParams.count; i++) {
            const i3 = i * 3;
            pos[i3 + 0] = basePositions[i3 + 0] + Math.sin(elapsedTime * particleParams.speed + i) * particleParams.amplitudeX;
            pos[i3 + 1] = basePositions[i3 + 1] + Math.sin(elapsedTime * particleParams.speed * 0.8 + i) * particleParams.amplitudeY;
            pos[i3 + 2] = basePositions[i3 + 2] + Math.cos(elapsedTime * particleParams.speed * 1.1 + i) * particleParams.amplitudeZ;
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    // Génère les positions initiales
    generatePositions();

    return {
        particleSystem,
        animateParticles,
        particleParams,
    };
}
