import * as THREE from 'three';
import VertexShader from './shaders/windows/vertex.glsl'
import FragmentShader from './shaders/windows/fragment.glsl'

export function createShaderPlane(scene) {
    
    const material = new THREE.ShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        uniforms: {
            uTime: { value: 0 },
        },
    });
    
    const planeParams = {
        positionX: 0,
        positionY: 6.7,
        positionZ: 0,
        rotateX: 0, 
        scaleX: 3.6,
        scaleY: 0.9,
        scaleZ: 1.7,
    };
    
    const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
    const shaderPlane = new THREE.Mesh(planeGeometry, material);
    shaderPlane.position.set(planeParams.positionX, planeParams.positionY, planeParams.positionZ);
    shaderPlane.scale.set(planeParams.scaleX, planeParams.scaleY, planeParams.scaleZ);

    shaderPlane.rotation.x = planeParams.rotateX;

    scene.add(shaderPlane);

    return { shaderPlane, material };
}
