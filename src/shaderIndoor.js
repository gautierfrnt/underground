import * as THREE from 'three';
import VertexShader from './shaders/indoor/vertex.glsl'
import FragmentShader from './shaders/indoor/fragment.glsl'

export function createShaderIndoor(scene) {
    
    const materialIndoor = new THREE.ShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
        uniforms: {
            uTime: { value: 0 },
        },
    });
    
    const planeParams = {
        positionX: 0,
        positionY: 8.5,
        positionZ: -40,
        rotateX: 0, 
        scaleX: 10.2,
        scaleY: 11.7,
        scaleZ: 1.7,
    };
    
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    const shaderIndoor = new THREE.Mesh(planeGeometry, materialIndoor);
    shaderIndoor.position.set(planeParams.positionX, planeParams.positionY, planeParams.positionZ);
    shaderIndoor.scale.set(planeParams.scaleX, planeParams.scaleY, planeParams.scaleZ);

    shaderIndoor.rotation.x = planeParams.rotateX;

    scene.add(shaderIndoor);

    return { shaderIndoor, materialIndoor };
}
