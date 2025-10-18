import * as THREE from 'three';
import VertexShader from './shaders/fog/vertex.glsl';
import FragmentShader from './shaders/fog/fragment.glsl';

export function createSmokePlane(scene) {
    const smokeParams = {
        position: { x: 0, y: 0.3, z: -27.3 },
        scale: { x: 1, y: 1 },
        density: 0.1,
        color: 0x000000,
        speed: 0.1,
    };

    const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    const smokeMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(smokeParams.color) },
            density: { value: smokeParams.density },
            speed: { value: smokeParams.speed },
            resolution: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
    });

    const smokePlane = new THREE.Mesh(planeGeometry, smokeMaterial);
    smokePlane.position.set(smokeParams.position.x, smokeParams.position.y, smokeParams.position.z);
    smokePlane.scale.set(smokeParams.scale.x, smokeParams.scale.y, 1);
    smokePlane.rotation.x = -Math.PI / 2;
    scene.add(smokePlane);

    return { smokePlane, smokeMaterial };
}
