import * as THREE from 'three';
import VertexShader from './shaders/tunnel/vertex.glsl';
import FragmentShader from './shaders/tunnel/fragment.glsl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Crée et configure le tunnel avec un shader personnalisé 
 */
export function createShaderTunnel(scene) {
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        uniforms: {
            uTime: { value: 0 },
        },
        side: THREE.DoubleSide,
    });

    const loader = new GLTFLoader();
    let tunnelModel;

    loader.load(
        './models/tunnel.glb',
        (gltf) => {
            tunnelModel = gltf.scene;

            tunnelModel.traverse((child) => {
                if (child.isMesh) {
                    child.material = shaderMaterial;
                }
            });

            scene.add(tunnelModel);
        },
    );

    return { tunnelModel, shaderMaterial };
}
